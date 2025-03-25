<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class UserService
{
    public function getAllUsers()
    {
        $sql = "SELECT * FROM users WHERE 1=1";
        $params = [];

        // if (!empty($filters['name'])) {
        //     $sql .= " AND name LIKE ?";
        //     $params[] = "%" . $filters['name'] . "%";
        // }
        // if (!empty($filters['email'])) {
        //     $sql .= " AND email = ?";
        //     $params[] = $filters['email'];
        // }

        // if (!empty($filters['order_by'])) {
        //     $direction = $filters['order_direction'] ?? 'ASC';
        //     $sql .= " ORDER BY " . $filters['order_by'] . " " . $direction;
        // }

        return DB::select($sql, $params);
    }

    public function getUserById($id)
    {
        return DB::select("SELECT * FROM users WHERE id = ?", [$id]);
    }

    public function updateUser($id, $data)
    {
        $sql = "UPDATE users SET ";
        $params = [];
        foreach ($data as $key => $value) {
            $sql .= $key . " = ?, ";
            $params[] = $value;
        }
        $sql = substr($sql, 0, -2);
        $sql .= " WHERE id = ?";
        $params[] = $id;

        return DB::update($sql, $params);
    }

    public function deleteUser($id)
    {
        return DB::delete("DELETE FROM users WHERE id = ?", [$id]);
    }
}
