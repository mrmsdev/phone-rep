#!/bin/sh
set -e

# Function to wait for database
wait_for_db() {
  echo "Waiting for database to be ready..."
  # Use nc (netcat) to check if the database port is open
  # We extract host and port from DATABASE_URL if possible, 
  # but in Docker Compose we usually know it's 'db:5432'
  until nc -z localhost 5432; do
    echo "Database is unavailable - sleeping"
    sleep 1
  done
  echo "Database is up - executing migrations"
}

# Only wait and migrate if we are in production and have a DATABASE_URL
if [ "$NODE_ENV" = "production" ] && [ -n "$DATABASE_URL" ]; then
  wait_for_db
  echo "Running prisma migrate deploy..."
  if npx prisma migrate deploy; then
    echo "Migrations applied successfully."
  else
    echo "Migration failed!"
  fi
  
  echo "Running prisma db seed..."
  if npx prisma db seed; then
    echo "Seeding completed successfully."
  else
    echo "Seeding failed!"
  fi
fi

echo "Starting application..."
exec "$@"
