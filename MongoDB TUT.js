show collections
use student
db.createCollection('Student')
db.student.insert({
                'fname':'Pankaj',
                'lname':'Modi',
                'class':'BSc',
                'city':'Mumbai',
                'age':26,
                'mobile':84579,
                'DOB': new Date(1997-10-15)}) // ISODate object
db.student.find()
db.student.insertMany([
    {
        'fname': 'Ravi', 'lname': 'Kumar',
        'class': 'MCA',
        'city': 'Delhi',
        'age': 22,
        'mobile': 98765,
        'DOB': new Date('2001-01-12')
    },
    {
        'fname': 'Sunita',
        'lname': 'Sharma',
        'class': 'BCA',
        'city': 'Jaipur',
        'age': 23,
        'mobile': 87654,
        'DOB': new Date('2000-02-23')
    },
    {
        'fname': 'Amit',
        'lname': 'Patel',
        'class': 'BTech',
        'city': 'Ahmedabad',
        'age': 24,
        'mobile': 76543,
        'DOB': new Date('1999-03-14')
    },
    {
        'fname': 'Geeta',
        'lname': 'Singh',
        'class': 'BCom',
        'city': 'Lucknow',
        'age': 25,
        'mobile': 65432,
        'DOB': new Date('1998-04-05')
    },
    {
        'fname': 'Rajesh',
        'lname': 'Gupta',
        'class': 'BA',
        'city': 'Kolkata',
        'age': 26,
        'mobile': 54321,
        'DOB': new Date('1997-05-16')
    },
    {
        'fname': 'Priya',
        'lname': 'Bose',
        'class': 'CA',
        'city': 'Kolkata',
        'age': 24,
        'mobile': 98765,
        'DOB': new Date('1999-04-12')
    },
    {
        'fname': 'Rahul',
        'lname': 'Gandhi',
        'class': 'PHD',
        'city': 'Delhi',
        'age': 23,
        'mobile': 87654,
        'DOB': new Date('2000-05-23')
    },
    {
        'fname': 'Anjali',
        'lname': 'Mehra',
        'class': 'BBA',
        'city': 'Mumbai',
        'age': 22,
        'mobile': 76543,
        'DOB': new Date('2001-06-14')
    }
])

// to rename a collection
db.student.renameCollection('Students')
db.Students.renameCollection('student')

//db.student.deleteOne({'fname':'Pankaj'})
db.student.find() // to list down all the documents in collection

// list down fname and city from all documents(in sql, select fname,city from student)
db.student.find({},{'fname':1,'city':1})
//{} is the query object which means it will match all documents in the collection.

// distinct values
db.student.distinct('age')
// total number of records in student collection
db.student.count()
//total number of records in a particular field 
db.student.count({'fname':{$exists:true}})

// IN statement
// find city in (Mumbai,Delhi,Jaipur)
db.student.find({city:{$in:['Mumbai','Jaipur','Delhi']}})
// find fname of students who are from city in (Mumbai,Delhi,Jaipur)
// find fname and age field of students whose city is in (Mumbai,Delhi,Jaipur)
db.student.find({'city':{$in :['Mumbai','Jaipur','Delhi']}},{'fname':1,'age':1,'city':1})
//{'fname':1,'age':1,'city':1} to list down any column we have to write this after the condition like  in,gt,lt..etc
db.student.find({"fname": 1,"age":1,"city": 1,"_id":0},{"city":{$in:["Mumbai","Jaipur","Delhi"]}}) // this one is incorrect

db.student.find({ "city": { $in: [ "Mumbai", "Jaipur", "Delhi" ] } }, { "fname": 1, "age": 1, "city": 1, "_id": 0 }) // this one is right

// lt(less than), lte(less than equal to),gt(greater than),gte(greater than equal to),ne(not equal to)
// find fname and city field from student document whose age is greater than 25
db.student.find({'age':{$gt:25}},{'fname':1,'city':1})
db.student.find()
// AND & OR operator
db.student.find({$or:[{'city':'Mumbai'},{'age':{$gt:25}}]})
db.student.find({$or:[{'city':'Mumbai'},{'age':{$gt:25}}]},{'fname':1,'class':1,'city':1,'age':1})
db.student.find({$and:[{'city':'Mumbai'},{'age':{$gt:25}}]},{'fname':1,'class':1,'city':1,'age':1})

// Sort function
// sort fname in ascending order
db.student.find().sort({'fname':1})
//sort fname is descending order
db.student.find().sort({'fname':-1})
// sort age by ascending order then sort name by ascending
db.student.find().sort({'age':1,'fname':1})
//limit function
db.student.find().sort({'age':1}).limit(3)
//Skip function
// it will skip the top 2 rows and will show the next top 3 rows
db.student.find().sort({'age':1}).limit(3).skip(2)

db.student.find({'age':{$gt:23}},{'fname':1,'lname':1,'age':1,'location':1}).sort({'age':-1})
db.student.find({'age':{$gt:23}},{'fname':1,'lname':1,'age':1,'location':1}).sort({'age':-1}).limit(3)
db.student.find({'age':{$gt:23}},{'fname':1,'lname':1,'age':1,'location':1}).sort({'age':-1}).limit(3).skip(2)


// update
db.student.find({'mobile':76543})
// .update will update/modify only the first row appear
db.student.update({'mobile':76543},{$set:{'lname':'Bendre'}})
// to update more than one column we will have 2 methods
// 1st method- using updateMany
db.student.updateMany({'mobile':76543},{$set:{lname:'endre'}})
// 2nd method - using {multi:true}
db.student.update({'mobile':76543},{$set:{'lname':'Bendre'}},{multi:true})
db.student.find()

// delete(or remove)- remove,removeMany,deleteOne,deleteMany
// remove method is deprecated as of MongoDB version 3.0, and it's recommended to use deleteOne() or deleteMany()
db.student.remove({fname:'Rajesh'})
db.student.remove({'lname':'Bendre'}) // to remove all matching value
db.student.remove({'lname':'Bendre',1}) // to remove only first matching value
db.student.deleteOne({'city':'Delhi'})
db.student.deleteMany({'age':23}) // to delete all matching values
db.student.deleteMany({'age':23},{'lname':'Gandhi'})
db.student.deleteMany({}) // to delete all documents from collection

// to replace - syntax
// db.collection_name.replaceOne({filter},{newDocument});
db.student.replaceOne({'class':'BSc'},{'class':'MCA'})
db.student.deleteOne({'class':'MCA'})



