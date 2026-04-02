import { config } from 'dotenv'

config({ path: ['.env.local', '.env'] })

function readArg(name: string) {
  const key = `--${name}`
  const index = process.argv.indexOf(key)

  if (index === -1) {
    return undefined
  }

  return process.argv[index + 1]
}

async function main() {
  const { auth } = await import('../src/lib/auth')

  const username = readArg('username')
  const password = readArg('password')
  const email = readArg('email')
  const name = readArg('name') ?? username

  if (!username || !password || !email) {
    throw new Error(
      'Usage: pnpm create-user --username <username> --password <password> --email <email> [--name <name>]',
    )
  }

  const ensuredName = name ?? username

  const result = await auth.api.signUpEmail({
    body: {
      username,
      displayUsername: username,
      name: ensuredName,
      email,
      password,
    },
  })

  console.log(
    JSON.stringify(
      {
        id: result.user.id,
        username,
        email: result.user.email,
      },
      null,
      2,
    ),
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
