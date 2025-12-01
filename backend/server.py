from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Mock data
students = [
    {"id": 1, "firstName": "Emma", "lastName": "Johnson", "age": 4, "institutionId": 1},
    {"id": 2, "firstName": "Liam", "lastName": "Smith", "age": 5, "institutionId": 1},
    {"id": 3, "firstName": "Olivia", "lastName": "Williams", "age": 3, "institutionId": 2},
    {"id": 4, "firstName": "Noah", "lastName": "Brown", "age": 4, "institutionId": 2},
    {"id": 5, "firstName": "Ava", "lastName": "Jones", "age": 5, "institutionId": 3},
    {"id": 6, "firstName": "Ethan", "lastName": "Garcia", "age": 3, "institutionId": 1},
    {"id": 7, "firstName": "Sophia", "lastName": "Miller", "age": 4, "institutionId": 3},
    {"id": 8, "firstName": "Mason", "lastName": "Davis", "age": 5, "institutionId": 2},
    {"id": 9, "firstName": "Isabella", "lastName": "Rodriguez", "age": 3, "institutionId": 1},
    {"id": 10, "firstName": "Logan", "lastName": "Martinez", "age": 4, "institutionId": 3},
]

institutions = [
    {"id": 1, "name": "Sunshine Preschool", "address": "123 Main St", "city": "Springfield", "state": "IL"},
    {"id": 2, "name": "Happy Kids Academy", "address": "456 Oak Ave", "city": "Portland", "state": "OR"},
    {"id": 3, "name": "Little Learners Center", "address": "789 Pine Rd", "city": "Austin", "state": "TX"},
]

@app.route('/api/students', methods=['GET'])
def get_students():
    return jsonify(students)

@app.route('/api/institutions', methods=['GET'])
def get_institutions():
    return jsonify(institutions)

@app.route('/api/institution/studentRoster', methods=['GET'])
def get_institution_roster():
    institution_id = request.args.get('institutionId', type=int)
    
    if institution_id is None:
        return jsonify({"error": "institutionId parameter is required"}), 400
    
    # Filter students by institution ID
    roster = [student for student in students if student['institutionId'] == institution_id]
    
    return jsonify(roster)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
