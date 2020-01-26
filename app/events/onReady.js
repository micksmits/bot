module.exports = class
{
  constructor (client)
  {
    this.client = client
    this.name = 'ready'
  }

  async run () {
    await this.client.wait(1000)
  }
}