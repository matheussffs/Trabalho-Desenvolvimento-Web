const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./database');
const multer = require('multer');
const categoriaRoutes = require('./routes/categoriaRoutes');
const filmeRoutes = require('./routes/filmeRoutes');
const indexRoutes = require('./routes/indexRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = 3000;

// Configuração do Multer para upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Configuração do EJS e expressLayouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Adicionar middleware de upload apenas nas rotas de filmes onde há upload de arquivos
app.use('/filmes', upload.single('imagem'));

app.use('/categorias', categoriaRoutes);
app.use('/filmes', filmeRoutes);
app.use('/index', indexRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
