const users = require('../mocks/users');

module.exports = {
  listUsers(request,response){
    const {order} = request.query;

    const sortedUsers = users.sort((elemAnte, elemAtual)=>{
      if(order === 'desc'){
        return elemAnte.id < elemAtual.id ? 1 : -1;
      }

      return elemAnte.id > elemAtual.id ? 1 : -1;
      
    });
    response.writeHead(200, { 'Content-Type': 'application/json'});
    response.end(JSON.stringify(sortedUsers));
  },

  getUserById(request,response){
    const {id} = request.params;

    const user = users.find((user)=> user.id === Number(id));

    if(!user){
      response.writeHead(400, { 'Content-Type': 'application/json'});
      response.end(JSON.stringify({error: 'User not found'}));
    }else{
      response.writeHead(200, { 'Content-Type': 'application/json'});
      response.end(JSON.stringify(user));
    }
  }
};