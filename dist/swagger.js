// src/swagger.json
var openapi = "3.1.0";
var info = {
  title: "CRUD",
  description: "Este \xE9 um projeto CRUD simples desenvolvido para estudo, com foco na cria\xE7\xE3o, edi\xE7\xE3o, exclus\xE3o e consulta de usu\xE1rios.",
  contact: {
    name: "Ayron Alves",
    url: "https://github.com/A1ves",
    email: "ayronwork@gmail.com"
  },
  version: "1.0"
};
var servers = [
  {
    url: "http://localhost:8000",
    description: "API to user"
  }
];
var paths = {
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
};
var components = {
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
};
var swagger_default = {
  openapi,
  info,
  servers,
  paths,
  components
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  components,
  info,
  openapi,
  paths,
  servers
});
