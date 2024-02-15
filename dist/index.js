var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/swagger.json
var require_swagger = __commonJS({
  "src/swagger.json"(exports2, module2) {
    module2.exports = {
      openapi: "3.1.0",
      info: {
        title: "CRUD",
        description: "Este \xE9 um projeto CRUD simples desenvolvido para estudo, com foco na cria\xE7\xE3o, edi\xE7\xE3o, exclus\xE3o e consulta de usu\xE1rios.",
        contact: {
          name: "Ayron Alves",
          url: "https://github.com/A1ves",
          email: "ayronwork@gmail.com"
        },
        version: "1.0"
      },
      servers: [
        {
          url: "http://localhost:8000",
          description: "API to user"
        }
      ],
      paths: {
        "/account": {
          post: {
            summary: "Cria\xE7\xE3o de usu\xE1rio",
            description: "Esta rota \xE9 responsavel por cadastrar um novo usuario",
            tags: ["User"],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User"
                  },
                  examples: {
                    user: {
                      value: {
                        userName: "User",
                        email: "email@test.com",
                        password: "1234"
                      }
                    }
                  }
                }
              }
            },
            responses: {
              "400": {
                description: "not found"
              },
              "201": {
                description: "created",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/User"
                    }
                  }
                }
              }
            }
          },
          put: {
            summary: "Alterar o nome do usu\xE1rio",
            description: "Esta rota \xE9 respons\xE1vel por alterar o nome do usu\xE1rio",
            tags: ["User"],
            parameters: [
              {
                name: "email",
                in: "header",
                description: "Email do usu\xE1rio a ser alterado o nome",
                required: true,
                schema: {
                  type: "string"
                }
              },
              {
                name: "password",
                in: "header",
                description: "Senha do email do usu\xE1rio a ser alterado o nome",
                required: true,
                schema: {
                  type: "string"
                }
              }
            ],
            requestBody: {
              description: "Nome do usu\xE1rio para alterar",
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string"
                      }
                    },
                    required: ["name"]
                  }
                }
              }
            },
            responses: {
              "400": {
                description: "not found"
              },
              "201": {
                description: "created",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/User"
                    }
                  }
                }
              }
            }
          },
          delete: {
            summary: "Deleta o usu\xE1rio",
            description: "Esta rota \xE9 respons\xE1vel por deletar o usu\xE1rio",
            tags: ["User"],
            parameters: [
              {
                name: "email",
                in: "header",
                description: "Email do usu\xE1rio a ser deletado",
                required: true,
                schema: {
                  type: "string"
                }
              },
              {
                name: "password",
                in: "header",
                description: "Senha do email do usu\xE1rio a ser deletado",
                required: true,
                schema: {
                  type: "string"
                }
              }
            ],
            responses: {
              "400": {
                description: "not found"
              },
              "201": {
                summary: "Ira retornar os outros usuarios cadastrados",
                description: "deleted",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/User"
                    }
                  }
                }
              }
            }
          }
        },
        "/searchUser": {
          get: {
            summary: "Busca de usuario",
            description: "Esta rota \xE9 responsavel por buscar o usuario pelo nome",
            tags: ["User"],
            parameters: [{
              name: "name",
              in: "header",
              description: "Nome do usuario para busca",
              required: true
            }],
            responses: {
              "400": {
                description: "not found"
              },
              "201": {
                description: "created",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/User"
                    }
                  }
                }
              }
            }
          }
        }
      },
      components: {
        schemas: {
          User: {
            type: "object",
            properties: {
              userName: {
                type: "string"
              },
              email: {
                type: "string"
              },
              password: {
                type: "string"
              },
              id: {
                type: "string"
              }
            }
          }
        }
      }
    };
  }
});

// src/index.js
var express = require("express");
var { v4: uuidv4 } = require("uuid");
var app = express();
var swaggerUi = require("swagger-ui-express");
var swaggerDocument = require_swagger();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
var users = [];
function verifyUser(request, response, next) {
  const { email, password } = request.headers;
  const userEmail = users.find((userEmail2) => userEmail2.email === email);
  if (!userEmail) {
    return response.status(400).json({ error: "Email not found" });
  }
  const userPassword = users.find((userPassword2) => userPassword2.password === password);
  if (!userPassword) {
    return response.status(400).json({ error: "Wrong password" });
  }
  request.userEmail = userEmail;
  return next();
}
app.post("/account", (request, response) => {
  const { userName, email, password } = request.body;
  if (!userName) {
    return response.status(400).json({ "user": "not found" });
  } else if (!email) {
    return response.status(400).json({ "email": "not found" });
  } else if (!password) {
    return response.status(400).json({ "password": "not found" });
  }
  const user = users.find((user2) => user2.email === email);
  if (!user) {
    users.push({
      userName,
      email,
      password,
      ID: uuidv4()
    });
    return response.status(201).send();
  }
  return response.status(400).json({ error: "user already created" });
});
app.get("/searchUser", (request, response) => {
  const { name } = request.headers;
  const user = users.find((user2) => user2.userName === name);
  if (!user) {
    return response.status(400).json({ error: "User not found" });
  }
  const resp = users.map((userExibition) => ({
    userName: userExibition.userName,
    email: userExibition.email,
    ID: userExibition.ID
  }));
  const index = resp.findIndex((user2) => user2.userName === name);
  return response.status(201).send(resp[index]);
});
app.put("/account", verifyUser, (request, response) => {
  const { email } = request.headers;
  const { name } = request.body;
  const user = users.find((user2) => user2.email === email);
  user.userName = name;
  return response.status(201).send(user);
});
app.delete("/account", verifyUser, (request, response) => {
  const { email } = request.headers;
  const index = users.findIndex((user) => user.email === email);
  users.splice(index, 1);
  return response.status(200).send(users);
});
app.listen(8e3);
