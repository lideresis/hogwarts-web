'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Database = use('Database')
const Hash = use('Hash')

Route.post('/login', async ({ request }) => {
    const { email, senha } = request.post()

    if (!email) return { error: 'Informe o login' }
    if (!senha) return { error: 'Informe a senha' }

    const user = await Database
        .table('usuarios')
        .where('email', email)
        .first()

    if (!user) return { error: 'E-mail não encontrado' }

    const isSamePassword = await Hash.verify(senha, user.senha)
    if (!isSamePassword) return { error: 'Senha incorreta' }

    return {
        email: user.email,
        nome: user.nome,
    }
})

Route.get('/wizards', async ({ request }) => {
    const { page } = request.get()

    const LIMIT = 10

    const countQuery = await Database
        .table('alunos')
        .count('id')
    const count = countQuery[0]['count(`id`)']

    const wizards = await Database
        .table('alunos')
        .offset(LIMIT * (page - 1))
        .limit(LIMIT)

    return {
        pages: Math.ceil(count / LIMIT),
        wizards
    }
})

Route.get('/wizard', async ({ request }) => {
    const { id } = request.get()

    const wizard = await Database
        .table('alunos')
        .where('id', id)
        .first()

    return (wizard || null)
})

Route.put('/wizard', async ({ request }) => {
    const { id, nome, idade, especialidade, ativo } = request.post()

    if (!nome) return { error: 'Informe o nome completo' }
    if (!idade) return { error: 'Informe a idade' }
    if (!especialidade) return { error: 'Informe a especialidade' }

    if (!id) {
        return await Database
            .table('alunos')
            .insert({
                nome,
                idade,
                especialidade,
                ativo: (ativo ? 1 : 0)
            })
    } else {
        return await Database
            .table('alunos')
            .where('id', id)
            .update({
                nome,
                idade,
                especialidade,
                ativo: (ativo ? 1 : 0)
            })
    }
})

Route.delete('/wizard', async ({ request }) => {
    const { id } = request.get()

    return await Database
        .table('alunos')
        .where('id', id)
        .delete()
})
