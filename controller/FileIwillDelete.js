// //login form back end autentication


// async function login (req, res) {
//     if(!username || !email) {
//         return res.status(400).json({msg: "please insert both fields"})
//     }
//     try {
//         const check = await dbconnection.query("SELECT username, email FROM user WHERE username = ? AND email = ?", [username, email]);
//         if(check.length === 0){
//             return res.status(400).json({msg: "username or email is incorrect"})
//         }else{

//         }

//     } catch (error) {
//         return res.status(500).json({msg: "there is something wrong, please try again later!"})
//     }
// }