/**
 * Password changing setting,
 * 
 * Configure Discounts Based on Quantity/Season
 * Auto-Reorder Levels
 *
 * Warehouse/Shop Management:
      Add/Edit/Delete Warehouse Locations
      Stock Transfer Between Warehouses

 * Theme and Branding:
      Set Dashboard Themes
      Add Custom Branding to Reports

 * Adding / Removing Suppliers

 * Product Categories:
      Add/Edit/Delete Product Categories
      Assign Default Categories for New Products

 * Unit of Measurement:
      Manage Units (e.g., kg, pcs, liters)
      Default Measurement Units
 * Backup Settings:
      Enable Automatic Backups
      Set Backup Frequency (Daily, Weekly, Monthly)
  
 * User Management:
      Add/Edit/Delete Users
      Assign Roles (e.g., Admin, Manager, Staff)
      Permission Levels for Each Role

 * Integration Settings:
      Export Formats (e.g., CSV, PDF)
      Scheduled Report Delivery

 */

import { PasswordChangeForm } from "@/components/settings";

const Settings = () => {
  return (
    <div className={containerStyles}>
      <div className={items}>
        <PasswordChangeForm />
      </div>
      <div className={items}>Item 2</div>
      <div className={items}>Item 3</div>
      <div className={items}>Item 4</div>
      <div className={items}>Item 5</div>
      <div className={items}>Item 6</div>
    </div>
  );
};
export default Settings;

const containerStyles = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";
const items = "border rounded-lg p-4 text-center shadow-md bg-[#FAFAFF]";
