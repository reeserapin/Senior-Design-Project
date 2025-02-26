import React from 'react';

function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <p>Here you can modify your account settings.</p>
      <div>
        <h3>Privacy Settings</h3>
        <label>
          <input type="checkbox" /> Make profile private
        </label>
      </div>
      <div>
        <h3>Notification Settings</h3>
        <label>
          <input type="checkbox" /> Receive email notifications
        </label>
      </div>
    </div>
  );
}

export default SettingsPage;
