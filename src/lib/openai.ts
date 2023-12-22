import OpenAI from 'openai'

const apiKey = process.env.OPENAI_API_KEY

if(!apiKey) {
    throw Error("OPENAI API key is note set")
}

const openai = new OpenAI({ apiKey })

export default openai