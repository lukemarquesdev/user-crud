DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'crud-users') THEN
        EXECUTE 'CREATE DATABASE "crud-users"';
    END IF;
END $$;

\c crud-users

ALTER DATABASE "crud-users" REFRESH COLLATION VERSION;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
