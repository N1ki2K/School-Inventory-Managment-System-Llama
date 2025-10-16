import { test, expect } from '@playwright/test'


test('homepage loads correctly', async ({ page }) => {
  await page.goto('/')
  
  // Check if the main heading is visible
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
  
  // Check if navigation is present
  await expect(page.getByText('School Inventory System')).toBeVisible()
  
  // Check if stats cards are present
  await expect(page.getByText('Total Items')).toBeVisible()
  await expect(page.getByText('Active Users')).toBeVisible()
})

test('navigation works correctly', async ({ page }) => {
  await page.goto('/')
  
  // Navigate to inventory page
  await page.getByRole('link', { name: 'Inventory' }).click()
  
  // Check if we're on the inventory page
  await expect(page.getByRole('heading', { name: 'Inventory' })).toBeVisible()
  
  // Navigate back to home
  await page.getByRole('link', { name: 'Home' }).click()
  
  // Check if we're back on the home page
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
})

test('inventory page displays items', async ({ page }) => {
  await page.goto('/inventory')
  
  // Check if the inventory table is present
  await expect(page.getByText('Dell Laptop XPS 13')).toBeVisible()
  await expect(page.getByText('Epson Projector')).toBeVisible()
  await expect(page.getByText('HP LaserJet Printer')).toBeVisible()
  
  // Check if search functionality is present
  await expect(page.getByPlaceholder('Search items...')).toBeVisible()
})
