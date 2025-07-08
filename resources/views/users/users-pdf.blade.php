<!DOCTYPE html>
<html>
<head>
    <title>Laporan Data User</title>
    <style>
        body {
            font-family: sans-serif;
            margin: 20px;
        }
        h1 {
            text-align: center;
            margin-bottom: 10px;
        }
        .report-info {
            text-align: center;
            margin-bottom: 20px;
            font-size: 0.9em;
            color: #555;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        tfoot th {
            background-color: #e0e0e0;
        }
    </style>
</head>
<body>
    <h1>Laporan Data User</h1>
    <div class="report-info">
        Tanggal Generate: {{ date('d-m-Y H:i:s') }}
    </div>
    <table>
        <thead>
            <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>Divisi</th>
                <th>Tanggal Dibuat</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($users as $user)
            <tr>
                <td>{{ $user->name }}</td>
                <td>{{ $user->email }}</td>
                <td>{{ $user->division ? $user->division->name : '-' }}</td>
                <td>{{ $user->created_at->format('d-m-Y H:i:s') }}</td>
            </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>Divisi</th>
                <th>Tanggal Dibuat</th>
            </tr>
        </tfoot>
    </table>
</body>
</html>