import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@school.com' },
    update: {},
    create: {
      email: 'admin@school.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin'
    }
  })

  console.log('✅ Created admin user:', admin.email)

  // Create inventory items matching the design
  const items = [
    {
      name: 'Projector',
      category: 'Electronics',
      location: 'Classroom 101',
      status: 'Available',
      icon: 'projector',
      description: 'Epson EB-X05 Projector',
      quantity: 1
    },
    {
      name: 'Laptop',
      category: 'Electronics',
      location: 'Computer Lab A',
      status: 'In Use',
      icon: 'laptop',
      description: 'Dell Latitude 5420',
      quantity: 1
    },
    {
      name: 'Markers',
      category: 'Office Supplies',
      location: 'Storage Room',
      status: 'Needs Repair',
      icon: 'markers',
      description: 'Whiteboard markers set',
      quantity: 12
    },
    {
      name: 'USB Drive',
      category: 'Electronics',
      location: 'IT Department',
      status: 'Available',
      icon: 'usb',
      description: 'SanDisk 64GB USB 3.0',
      quantity: 5
    },
    {
      name: 'Mouse',
      category: 'Electronics',
      location: 'Computer Lab B',
      status: 'Available',
      icon: 'mouse',
      description: 'Logitech Wireless Mouse',
      quantity: 10
    },
    {
      name: 'Keyboard',
      category: 'Electronics',
      location: 'Computer Lab A',
      status: 'Available',
      icon: 'briefcase',
      description: 'Mechanical Keyboard',
      quantity: 8
    }
  ]

  for (const item of items) {
    const created = await prisma.inventoryItem.create({
      data: item
    })
    console.log('✅ Created item:', created.name)
  }

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

