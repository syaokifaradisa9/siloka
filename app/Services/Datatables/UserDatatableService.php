<?php

namespace App\Services\Datatables;

use App\Models\User;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use IntlDateFormatter;

class UserDatatableService
{
    private function getStartedQuery(Request $request){
        $query = User::with('division');

        $query->when($request->search, function($query, $search){
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        })->when($request->sort_by, function($query, $sortBy) use ($request){
            $sortType = $request->sort_type ?? 'asc';
            if ($sortBy === 'division.name') {
                $query->leftJoin('divisions', 'users.division_id', '=', 'divisions.id')
                      ->orderBy('divisions.name', $sortType)
                      ->select('users.*');
            } else {
                $query->orderBy($sortBy, $sortType);
            }
        });

        $columnFilters = ['name', 'email', 'division_id'];

        foreach ($columnFilters as $column) {
            if ($request->has($column) && $request->input($column) !== null) {
                $value = $request->input($column);
                if ($column === 'division_id') {
                    if ($value !== '0') {
                        $query->whereHas('division', function ($q) use ($value) {
                            $q->where('id', $value);
                        });
                    }
                } else {
                    $query->where($column, 'like', "%{$value}%");
                }
            }
        }

        return $query;
    }

    public function getDatatable(Request $request)
    {
        $perPage = $request->per_page ?? 10;
        $query = $this->getStartedQuery($request);

        return $query->paginate($perPage);
    }

    private function formatDateToIndonesian($dateString)
    {
        $date = new \DateTime($dateString);
        $formatter = new \IntlDateFormatter(
            'id_ID',
            \IntlDateFormatter::LONG,
            \IntlDateFormatter::NONE,
            'Asia/Jakarta',
            \IntlDateFormatter::GREGORIAN,
            'd MMMM yyyy'
        );
        return $formatter->format($date);
    }

    public function printPdf(Request $request){
        $users = $this->getStartedQuery($request)->get();
        $pdf = Pdf::loadView('users.users-pdf', compact('users'));
        $formattedDate = $this->formatDateToIndonesian(date('Y-m-d'));
        $fileName = 'Laporan Data User Per ' . $formattedDate . '.pdf';
        return $pdf->download($fileName);
    }

    public function printExcel(Request $request){
        $users = $this->getStartedQuery($request)->get();

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Set header
        $sheet->setCellValue('A1', 'Nama');
        $sheet->setCellValue('B1', 'Email');
        $sheet->setCellValue('C1', 'Divisi');
        $sheet->setCellValue('D1', 'Tanggal Dibuat');

        // Fill data
        $row = 2;
        foreach ($users as $user) {
            $sheet->setCellValue('A' . $row, $user->name);
            $sheet->setCellValue('B' . $row, $user->email);
            $sheet->setCellValue('C' . $row, $user->division ? $user->division->name : '-');
            $sheet->setCellValue('D' . $row, $user->created_at->format('Y-m-d H:i:s'));
            $row++;
        }

        // Auto-size columns
        foreach (range('A', 'D') as $column) {
            $sheet->getColumnDimension($column)->setAutoSize(true);
        }

        $writer = new Xlsx($spreadsheet);
        $formattedDate = $this->formatDateToIndonesian(date('Y-m-d'));
        $fileName = 'Laporan Data User Per ' . $formattedDate . '.xlsx';
        $tempFile = tempnam(sys_get_temp_dir(), $fileName);
        $writer->save($tempFile);

        return response()->download($tempFile, $fileName)->deleteFileAfterSend(true);
    }
}
