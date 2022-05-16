const express = require('express');
const app = express();
const port = process.env.PORT;
const pool = require('./dbConnection');
app.use(express.json());

app.get('/', (req, res, next ) => {
  res.status(200).json({msg: "https://www.fecaf.com.br"});
})

app.get('/listar', (req, res, next) => {
  let sql = "SELECT * FROM pedidos;"

  pool.query(sql, (err, result) => {
    if(err) {
      res.status(503).json({"status": "error"});
    }else {
      res.status(200).json({"status": "ok", "info": result.rows})
    }
  })
})

app.get('/clientes', (req, res, next) => {
  let sql = "SELECT * FROM clientes;"

  pool.query(sql, (err, result) => {
    if(err) {
      res.status(503).json({"status": "error"});
    }else {
      res.status(200).json({"status": "ok", "info": result.rows})
    }
  })
})

app.post('/inserir', (req, res, next) => {
  const obj = req.body;
  let sql = "INSERT INTO pedidos (cliente, sabor, quantidade, tamanho)";
      sql += "VALUES ('" + obj.cliente + "', '" + obj.sabor + "', '" + obj.quantidade + "', '" + 
             obj.tamanho + "');"
  
      // sql += ("', '" + obj.sabor);
      // sql += ("', '" + obj.quantidade);
      // sql += ("', '" + obj.tamanho + "');")
      pool.query(sql, (err, result) => {
        if(err) {
          res.status(500).json({"status": "error", "info": "Não foi possível inserir os dados no banco"})
          console.log(err);
        }else {
          res.status(200).json({"status": "ok", "info": "Dados inseridos com sucesso"})
        }
      })
    });

    app.post('/cadastrar', (req, res, next) => {
      const obj = req.body;
      let sql = "INSERT INTO clientes (nome, user, senha, email, sexo)";
          sql += "VALUES ('" + obj.nome + "', '" + obj.user + "', '" + obj.senha + "', '" + 
                 obj.email + "', '" + obj.sexo + "');"
          pool.query(sql, (err, result) => {
            if(err) {
              res.status(500).json({"status": "error", "info": "Não foi possível inserir os dados no banco"})
              console.log(err);
            }else {
              res.status(200).json({"status": "ok", "info": "Dados inseridos com sucesso"})
            }
          })
        });

app.delete('/pedidos', (req, res, next) => {
  let sql = "DROP TABLE IF EXISTS pedidos;"
      sql += "CREATE TABLE pedidos (";
      sql += "cliente varchar(100), ";
      sql += "sabor varchar(100), "
      sql += "quantidade int,"
      sql += "tamanho varchar(100)"
      sql += ")";

  const mensagem = {
    status: "",
    info: ""
  }
  
  pool.query(sql, (err, result) => {
    if(err) {
      mensagem.status = "erro"
      mensagem.info = result
      res.status(500).json(err)
      console.log(err)
    }else {
     mensagem.status = "ok"
     mensagem.info = "banco de dados criado com sucesso"
     res.status(200).json(mensagem.info)
      
    }
  })
})

app.delete('/clientes', (req, res, next) => {
  let sql = "DROP TABLE IF EXISTS clientes;"
      sql += "CREATE TABLE clientes (";
      sql += "nome varchar(100),"
      sql += "user varchar(100),"
      sql += "senha varchar(100),"
      sql += "email varchar(100),"
      sql += "sexo varchar(20)"
      sql += ")";

  const mensagem = {
    status: "",
    info: ""
  }
  
  pool.query(sql, (err, result) => {
    if(err) {
      mensagem.status = "erro"
      mensagem.info = result
      res.status(500).json(err)
      console.log(err)
    }else {
     mensagem.status = "ok"
     mensagem.info = "banco de dados criado com sucesso"
     res.status(200).json(mensagem.info)
      
    }
  })
})

app.listen(port, () => {
  console.log("server up");
});