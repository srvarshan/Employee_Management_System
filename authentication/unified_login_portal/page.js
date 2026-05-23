// Login form role-based redirect
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value.toLowerCase().trim();
        if (email.includes('hr') || email.includes('admin') || email.includes('sarah') || email.includes('alex')) {
            window.location.href = '../../admin_hr/admin_hr_dashboard/code.html';
        } else if (email.includes('manager') || email.includes('lead') || email.includes('marcus') || email.includes('jonathan')) {
            window.location.href = '../../management/management_dashboard/code.html';
        } else {
            window.location.href = '../../employee/employee_dashboard/code.html';
        }
    });
