//Hello Ma'am/Sir, by running following command in sequence
//you can execute query without copy and paste
// 1) please make sure terminal is opened inside same folder where this script.js exist to make things simpler.
// 2) mongosh or mongo
// 3) use yourDbName
// 4) load('script.js') 

//Here is Mongo Aggregration Query
let ans = db.users.aggregate([
    {
        $group: {
            _id: "$country",
            usersCount: { $sum: 1 },
            avgAge: { $avg: "$age" }
        }
    },
    {
        $group: {
            _id: null,
            users: { $sum: "$usersCount" },
            avgUsersAge: { $avg: "$avgAge" },
            usersPerCountry: {
                $push: {
                    country: "$_id",
                    totalUsers: "$usersCount",
                    averageAge: "$avgAge"
                }
            }
        }
    }
])

//printing result
print(ans)
