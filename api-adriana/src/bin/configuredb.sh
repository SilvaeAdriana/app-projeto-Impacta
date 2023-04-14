#!/bin/bash

export PGPASSWORD="123456"

database="adriana_db"

echo "Configuring database: $database"

dropdb -U postgres adriana_db

createdb -U postgres adriana_db

psql -U postgres adriana_db < ./src/bin/sql/sql.sql

echo "$database configured"

