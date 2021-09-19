mongo $DB_NAME --host $DB_HOST --port $DB_PORT <<EOF
use $DB_NAME
db.createUser({
    user: '$DB_USERNAME',
    pwd: '$DB_PASSWORD',
    roles: [
        {
            role: 'readWrite',
            db: '$DB_NAME',
        }
    ]
})
EOF
