import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os

load_dotenv()

def create_database_from_schema():
    connection = None
    try:
        connection = mysql.connector.connect(
            host=os.getenv("DB_HOST"),
            port=int(os.getenv("DB_PORT")),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
        )

        cursor = connection.cursor()
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {os.getenv('DB_NAME')}")
        connection.database = os.getenv('DB_NAME')

        with open("database/schema.sql", "r", encoding="utf-8") as f:
            schema = f.read()
            for statement in schema.split(";"):
                stmt = statement.strip()
                if stmt:
                    cursor.execute(stmt)

        print("Banco de dados criado com sucesso!")

    except Error as e:
        print("Erro ao criar o banco:", e)
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()
