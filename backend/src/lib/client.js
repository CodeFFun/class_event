const {PrismaClient, event} = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    user : prisma.user,
    review: prisma.reviews,
    event:prisma.events,
    organization: prisma.organizations,
    ticket: prisma.ticket,
    eventType: event,
}