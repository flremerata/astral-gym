# ASTRAL Gym Management System - Troubleshooting Guide

## Quick Diagnostics

### Browser Console Errors (F12 to Open)
Most issues can be diagnosed by opening the browser console:

**Chrome/Edge**: Ctrl+Shift+J (Windows) or Cmd+Option+J (Mac)
**Firefox**: Ctrl+Shift+K (Windows) or Cmd+Option+K (Mac)
**Safari**: Cmd+Option+I (Mac), then click Console tab

## Common Issues & Solutions

### 1. Blank Page or White Screen

**Symptoms**: Page loads but shows nothing

**Causes**:
- JavaScript disabled
- Browser cache corrupted
- CSS not loading
- HTML file corrupted

**Solutions**:
```
1. Hard refresh: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
2. Clear browser cache completely
3. Try different browser
4. Check JavaScript is enabled:
   - Chrome: Settings → Privacy → Site Settings → JavaScript
   - Firefox: Type about:config → search javascript.enabled
5. Verify file size: File should be ~2.5 MB
6. Check browser console for errors
```

### 2. "Cannot find module" or Script Errors

**Symptoms**: Console shows errors about missing files or functions

**Causes**:
- Incomplete HTML file
- Line breaks in code
- Missing CDN resources
- Outdated browser

**Solutions**:
```
1. Verify file is complete (2,556 lines)
2. Check CDN connections:
   - Google Fonts: https://fonts.googleapis.com
   - html2pdf: https://cdnjs.cloudflare.com
3. Try different browser
4. Disable browser extensions
5. View HTML source to verify structure
```

### 3. Login Not Working

**Symptoms**: Login button does nothing or shows error

**Causes**:
- Wrong credentials
- localStorage disabled
- JavaScript error on login
- Session storage corrupted

**Solutions**:
```
1. Use correct credentials: admin / password
2. Check localStorage is enabled:
   - Chrome: Settings → Privacy → Cookies & Site Data
   - Firefox: Preferences → Privacy → Delete cookies when closed
3. Clear all site data:
   - Right-click page → Inspect → Application → Clear Storage
4. Try incognito/private mode
5. Check console for JavaScript errors
6. Verify time is correct (needed for session tracking)
```

### 4. Data Loss After Refresh

**Symptoms**: All member data disappears after page reload

**Causes**:
- localStorage disabled
- Incognito/private browsing mode
- Browser set to clear data on exit
- Storage quota exceeded

**Solutions**:
```
1. Don't use incognito/private mode (data is temporary)
2. Check localStorage enabled:
   Settings → Privacy → Cookies → Allow local data
3. Check storage limits:
   Press F12 → Application → Local Storage → View size
4. Use backup feature:
   - Click ⚙️ Settings
   - Click "📥 Backup Data"
   - Save JSON file to computer
5. Import backup to restore:
   - Click ⚙️ Settings
   - Click "📥 Restore Data"
   - Select backed-up JSON file
```

### 5. Session Expires Too Quickly

**Symptoms**: "Session expired" message after brief inactivity

**Causes**:
- Session timeout set too low (default: 30 minutes)
- Activity not detected properly
- Multiple tabs/windows open
- Browser sleeping/system sleep

**Solutions**:
```
1. Make sure you're performing actions (clicking counts as activity)
2. Keep browser tab in focus
3. Close other tabs of same site
4. Change timeout in HTML:
   - Line ~50: CONFIG.sessionTimeout = 60 * 60 * 1000 (1 hour)
5. Check system is not in sleep mode
6. Check browser isn't throttled
```

### 6. "Export Failed" or File Not Downloading

**Symptoms**: Click export button but nothing happens

**Causes**:
- Pop-up blocked
- No data to export
- Browser security restrictions
- Insufficient storage space

**Solutions**:
```
1. Check pop-up blocker:
   - Chrome: Settings → Privacy → Pop-ups and redirects → Allow
   - Firefox: Preferences → Privacy → Popup blocker
2. Verify data exists:
   - Open page with data to export
   - Try export again
3. Try different export format:
   - CSV instead of PDF
4. Clear browser cache
5. Try different browser
6. Check disk space on computer
```

### 7. PDF Export Not Working

**Symptoms**: Export to PDF button doesn't work

**Causes**:
- html2pdf library not loading
- CDN blocked
- Browser permissions
- Large data set

**Solutions**:
```
1. Check CDN is accessible:
   F12 → Network tab → Reload → Look for html2pdf request
2. Try CSV export instead (more reliable)
3. Update HTML with new CDN link:
   <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
4. Check browser permissions:
   Settings → Privacy → Files downloaded
5. For large data, export CSV instead of PDF
```

### 8. API Integration Not Working

**Symptoms**: Cannot connect to backend API

**Causes**:
- Wrong API URL configured
- CORS not enabled
- API server down
- Network blocked

**Solutions**:
```
1. Verify API URL in CONFIG:
   - Line ~50: CONFIG.apiBaseUrl = 'http://your-api.com/api'
2. Check CORS headers on API:
   - Should include: Access-Control-Allow-Origin
3. Test API manually:
   - Open browser console
   - fetch(CONFIG.apiBaseUrl + '/members').then(r => r.json())
4. Check network tab for errors:
   F12 → Network → Reload → Look for failed requests
5. Verify API server is running
6. Check firewall/network settings
```

### 9. Dark Mode Not Saving

**Symptoms**: Theme resets to light mode after refresh

**Causes**:
- localStorage disabled
- Browser privacy settings
- Cache cleared
- Incognito mode

**Solutions**:
```
1. Enable localStorage:
   Settings → Privacy → Cookies → Allow local data
2. Don't use incognito/private mode
3. Clear browser cache completely
4. Try a different browser
5. Check browser isn't in privacy mode
6. Manually set theme in HTML code:
   - Line ~1: Add class="light-mode" to <body> tag
```

### 10. Members Not Appearing in List

**Symptoms**: Member management page is empty

**Causes**:
- No members added yet
- Data not saved
- Filter hiding members
- Search filter active

**Solutions**:
```
1. Add a member:
   - Click "📝 Add Member" button
   - Fill in form
   - Click Save
2. Check filters:
   - Look for any active status filters
   - Clear search box
3. Check localStorage:
   F12 → Application → Local Storage → astral_members
4. Try importing demo data:
   - Click ⚙️ Settings
   - Import demo members (if available)
5. Check console for errors
```

### 11. Payment/Sales Not Recording

**Symptoms**: Click "Record Payment" but transaction doesn't save

**Causes**:
- Member not selected
- Invalid amount
- localStorage issue
- Form validation failing

**Solutions**:
```
1. Select member first (required)
2. Enter valid amount (positive number)
3. Check all required fields are filled
4. Look for error message in red
5. Check localStorage:
   F12 → Application → Local Storage
6. Refresh page and try again
7. Check browser console for errors
```

### 12. Attendance Check-In Not Working

**Symptoms**: Check-in button doesn't record attendance

**Causes**:
- Member not selected
- Already checked in today
- localStorage issue
- Date/time incorrect

**Solutions**:
```
1. Select member first
2. Check if already checked in today:
   - Won't allow duplicate same-day check-ins
3. Verify date/time on computer is correct
4. Try different member
5. Clear localStorage:
   F12 → Application → Clear Storage
6. Restart browser
7. Check console for errors
```

### 13. Reminders Not Sending

**Symptoms**: Scheduled reminders don't appear

**Causes**:
- Browser tab not active
- Notifications disabled
- LocalStorage cleared
- Scheduled for wrong date

**Solutions**:
```
1. Keep browser tab open and active
2. Enable notifications:
   - Chrome: Settings → Privacy → Notifications
3. Check reminder schedule:
   - Click "📬 Reminders"
   - Verify date is correct
   - Verify reminder type matches criteria
4. Refresh page
5. Add test reminder manually
6. Check system notifications are enabled
```

### 14. "Insufficient Permissions" Error

**Symptoms**: Cannot access certain features or pages

**Causes**:
- Not logged in
- Session expired
- localStorage corrupted
- Wrong user type

**Solutions**:
```
1. Log out and log back in
2. Use correct credentials: admin / password
3. Clear localStorage:
   F12 → Application → Clear Storage
4. Check session timeout in console
5. Try private/incognito window
```

### 15. Slow Performance

**Symptoms**: Page is slow, buttons unresponsive

**Causes**:
- Too much data (thousands of records)
- Browser low on memory
- Computer overloaded
- Large exports processing

**Solutions**:
```
1. Clear browser cache
2. Close other tabs/applications
3. Delete old data:
   - Remove members no longer at gym
   - Archive old transactions
4. Split large exports:
   - Export one month at a time
5. Use different browser
6. Restart browser
7. Check browser performance:
   F12 → Performance → Record → Analyze
```

## Advanced Diagnostics

### Check localStorage Size
```javascript
// In browser console
let totalSize = 0;
for (let key in localStorage) {
  if (localStorage.hasOwnProperty(key)) {
    totalSize += localStorage[key].length + key.length;
  }
}
console.log('Total localStorage:', (totalSize / 1024).toFixed(2), 'KB');
```

### View All Stored Data
```javascript
// In browser console
for (let key in localStorage) {
  console.log(key, localStorage[key]);
}
```

### Check Session Status
```javascript
// In browser console
JSON.parse(localStorage.getItem('astral_session'))
JSON.parse(localStorage.getItem('astral_members'))
JSON.parse(localStorage.getItem('astral_logs'))
```

### Clear All Data (Warning: Deletes Everything)
```javascript
// In browser console
localStorage.clear()
sessionStorage.clear()
// Refresh page to reset
```

### Check API Connectivity
```javascript
// In browser console
fetch('https://your-api.com/api/members')
  .then(r => r.json())
  .then(d => console.log('Success:', d))
  .catch(e => console.error('Error:', e))
```

### Test Form Validation
```javascript
// In browser console
validateEmail('test@example.com')  // Should return true
validatePhone('5551234567')         // Should return true
validateName('John Doe')            // Should return true
```

## Browser Compatibility

| Browser | Status | Min Version |
|---------|--------|-------------|
| Chrome | ✅ Full support | 90+ |
| Firefox | ✅ Full support | 88+ |
| Safari | ✅ Full support | 14+ |
| Edge | ✅ Full support | 90+ |
| IE 11 | ❌ Not supported | N/A |

## Performance Tips

1. **Faster Loading**:
   - Use browser cache
   - Disable browser extensions
   - Clear browser cache regularly

2. **Better Performance**:
   - Keep fewer than 1000 members
   - Archive old transactions
   - Clear old backup files

3. **Smoother Experience**:
   - Keep browser updated
   - Use Chrome/Edge for best performance
   - Close other tabs

## Getting Help

### Information to Provide
When reporting an issue, include:
1. Browser name and version
2. Operating system (Windows/Mac/Linux)
3. What you were doing when issue occurred
4. Error message from console (F12)
5. Steps to reproduce
6. Screenshots if applicable

### Debug Mode
To enable debug logging:

```javascript
// In browser console
localStorage.setItem('DEBUG_MODE', 'true')
// Reload page - now you'll see detailed logs
```

### Remote Support
For issues needing help:
1. Enable debug mode (above)
2. Export system logs:
   ```javascript
   JSON.parse(localStorage.getItem('astral_logs'))
   ```
3. Share logs with support (sanitize sensitive data first)

---

**Version**: 2.0  
**Last Updated**: 2024  
**Status**: Production Ready ✅
