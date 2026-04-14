let balance = 1000;

/**
 * LOGIN LOGIC
 * Sets the user name across the dashboard and switches from login to main view.
 */
function handleLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // PIN is set to 1234 as discussed
    if (user.trim() !== "" && pass === "1234") {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('dashboard').style.display = 'flex';
        
        // Setting names in English
        document.getElementById('welcome-msg').innerText = "Welcome back, " + user;
        document.getElementById('display-name').innerText = "HOLDER: " + user.toUpperCase();
        
        // Also updating the name on the Virtual Visa Card
        if(document.getElementById('card-holder-name')) {
            document.getElementById('card-holder-name').innerText = user.toUpperCase();
        }

        // Show the initial Overview tab
        switchTab('overview');
        updateUI();
    } else {
        alert("Invalid Login! Please enter your name and PIN: 1234");
    }
}

/**
 * TAB SWITCHING LOGIC
 * This handles the sidebar clicks for Overview, Transactions, My Cards, and Settings.
 */
function switchTab(tabName) {
    // 1. Hide all sections
    const sections = document.querySelectorAll('.tab-content');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // 2. Show the specifically clicked section
    const activeSection = document.getElementById('section-' + tabName);
    if (activeSection) {
        activeSection.style.display = 'block';
    }

    // 3. Update Sidebar UI (remove 'active' from all, add to clicked one)
    const navItems = document.querySelectorAll('.sidebar li');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    const activeNavItem = document.getElementById('tab-' + tabName);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
}

/**
 * UI UPDATES
 * Formats the balance in Indian Rupee (₹) format.
 */
function updateUI() {
    const balanceElement = document.getElementById('balance');
    if (balanceElement) {
        balanceElement.innerText = "₹" + balance.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
}

/**
 * BANKING ACTIONS
 */
function deposit() {
    const amountInput = document.getElementById('amount');
    let amt = parseFloat(amountInput.value);

    if (amt > 0) {
        balance += amt;
        addHistory("Deposit (Credit)", "+₹" + amt.toFixed(2));
        updateUI();
        amountInput.value = "";
    } else {
        alert("Please enter a valid amount to deposit.");
    }
}

function withdraw() {
    const amountInput = document.getElementById('amount');
    let amt = parseFloat(amountInput.value);

    if (amt > 0 && amt <= balance) {
        balance -= amt;
        addHistory("Withdraw (Debit)", "-₹" + amt.toFixed(2));
        updateUI();
        amountInput.value = "";
    } else if (amt > balance) {
        alert("Insufficient Balance!");
    } else {
        alert("Please enter a valid amount to withdraw.");
    }
}

/**
 * TRANSACTION HISTORY
 * Adds a new list item to the history section.
 */
function addHistory(type, amount) {
    const historyList = document.getElementById('history');
    if (historyList) {
        let li = document.createElement('li');
        let date = new Date().toLocaleDateString('en-IN');
        
        // Color coding: Green for plus, Red for minus
        let color = amount.includes('+') ? '#10b981' : '#ef4444';

        li.innerHTML = `
            <span><strong>${type}</strong><br><small style="color:#94a3b8">${date}</small></span>
            <span style="color: ${color}; font-weight: bold;">${amount}</span>
        `;
        // Prepend adds the latest transaction to the top
        historyList.prepend(li);
    }
}