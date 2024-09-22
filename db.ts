import * as SQLite from 'expo-sqlite'
import { electrify } from 'electric-sql/expo'

// Create the expo-sqlite database connection. The first argument
// is your database name. Changing this will create/use a new
// local database file.
const conn = SQLite.openDatabase('electric.db')

// Import your generated database schema.
import { schema } from './generated/client'

// Define custom configuration if needed
const config = { url: 'https://example.com:5133' }

// Instantiate your electric client.
const electric = await electrify(conn, schema, config)

// Connect to Electric, passing along your authentication token
// See Usage -> Authentication for more details.
await electric.connect('your token')

const { db } = electric

const results = await db.projects.findMany()
console.log(results)