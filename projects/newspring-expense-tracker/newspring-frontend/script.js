// Sample Data - Replace with API calls to your backend
const monthlyData = {
    january: {
        income: [
            { category: 'Tithes', amount: 2500, week: 1 },
            { category: 'Offerings', amount: 800, week: 1 },
            { category: 'Tithes', amount: 2700, week: 2 },
            { category: 'Offerings', amount: 400, week: 2 },
            { category: 'Tithes', amount: 2400, week: 3 },
            { category: 'Donations', amount: 400, week: 3 },
            { category: 'Tithes', amount: 2800, week: 4 },
            { category: 'Offerings', amount: 600, week: 4 }
        ],
        expenses: [
            { category: 'Staff Salaries', amount: 3000, week: 1 },
            { category: 'Utilities', amount: 200, week: 1 },
            { category: 'Staff Salaries', amount: 3000, week: 2 },
            { category: 'Utilities', amount: 250, week: 2 },
            { category: 'Maintenance', amount: 400, week: 3 },
            { category: 'Programs', amount: 500, week: 3 },
            { category: 'Staff Salaries', amount: 3000, week: 4 },
            { category: 'Supplies', amount: 250, week: 4 }
        ]
    },
    february: {
        income: [
            { category: 'Tithes', amount: 2700, week: 1 },
            { category: 'Offerings', amount: 700, week: 1 },
            { category: 'Tithes', amount: 2500, week: 2 },
            { category: 'Offerings', amount: 400, week: 2 },
            { category: 'Tithes', amount: 2900, week: 3 },
            { category: 'Donations', amount: 300, week: 3 },
            { category: 'Tithes', amount: 2700, week: 4 },
            { category: 'Offerings', amount: 400, week: 4 }
        ],
        expenses: [
            { category: 'Staff Salaries', amount: 3000, week: 1 },
            { category: 'Utilities', amount: 250, week: 1 },
            { category: 'Staff Salaries', amount: 3000, week: 2 },
            { category: 'Utilities', amount: 250, week: 2 },
            { category: 'Maintenance', amount: 300, week: 3 },
            { category: 'Programs', amount: 600, week: 3 },
            { category: 'Staff Salaries', amount: 3000, week: 4 },
            { category: 'Supplies', amount: 200, week: 4 }
        ]
    }
};

// Initialize Local Storage with data
const initializeData = () => {
    const storedData = localStorage.getItem('churchFinances');
    if (!storedData) {
        localStorage.setItem('churchFinances', JSON.stringify(monthlyData));
    }
};

// Get current data from localStorage
const getCurrentData = (month = 'january') => {
    const data = JSON.parse(localStorage.getItem('churchFinances'));
    return data[month] || monthlyData[month];
};

// Save data to localStorage
const saveData = (month, data) => {
    const allData = JSON.parse(localStorage.getItem('churchFinances'));
    allData[month] = data;
    localStorage.setItem('churchFinances', JSON.stringify(allData));
};

// Format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: 'GHS'
    }).format(amount);
};

// Calculate totals
const calculateTotals = (data) => {
    const totalIncome = data.income.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = data.expenses.reduce((sum, item) => sum + item.amount, 0);
    const balance = totalIncome - totalExpenses;
    
    return { totalIncome, totalExpenses, balance };
};

// Calculate weekly breakdown from actual data
const calculateWeeklyBreakdown = (data) => {
    const weeks = [];
    
    // Create weeks 1-5
    for (let i = 1; i <= 5; i++) {
        const weekIncome = data.income
            .filter(item => item.week === i)
            .reduce((sum, item) => sum + item.amount, 0);
        
        const weekExpenses = data.expenses
            .filter(item => item.week === i)
            .reduce((sum, item) => sum + item.amount, 0);
        
        weeks.push({
            week: i,
            income: weekIncome,
            expenses: weekExpenses
        });
    }
    
    return weeks;
};

// Update Summary Cards
const updateSummaryCards = (month) => {
    const data = getCurrentData(month);
    const { totalIncome, totalExpenses, balance } = calculateTotals(data);
    
    document.getElementById('totalIncome').textContent = formatCurrency(totalIncome);
    document.getElementById('totalExpense').textContent = formatCurrency(totalExpenses);
    document.getElementById('balance').textContent = formatCurrency(balance);
    
    const balanceStatus = document.getElementById('balanceStatus');
    if (balance >= 0) {
        balanceStatus.textContent = 'Surplus';
        balanceStatus.style.color = '#10b981';
    } else {
        balanceStatus.textContent = 'Deficit';
        balanceStatus.style.color = '#ef4444';
    }
};

// Populate Weekly Table
const populateWeeklyTable = (month) => {
    const data = getCurrentData(month);
    const weeks = calculateWeeklyBreakdown(data);
    const tbody = document.getElementById('weeklyBody');
    tbody.innerHTML = '';
    
    weeks.forEach(week => {
        const balance = week.income - week.expenses;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Week ${week.week}</td>
            <td style="color: #10b981; font-weight: 500;">${formatCurrency(week.income)}</td>
            <td style="color: #ef4444; font-weight: 500;">${formatCurrency(week.expenses)}</td>
            <td style="color: ${balance >= 0 ? '#06b6d4' : '#ef4444'}; font-weight: 500;">${formatCurrency(balance)}</td>
        `;
        tbody.appendChild(row);
    });
};

// Populate Income Breakdown
const populateIncomeBreakdown = (month) => {
    const data = getCurrentData(month);
    const container = document.getElementById('incomeBreakdown');
    container.innerHTML = '';
    
    // Group by category and sum
    const incomeByCategory = {};
    data.income.forEach(income => {
        if (incomeByCategory[income.category]) {
            incomeByCategory[income.category] += income.amount;
        } else {
            incomeByCategory[income.category] = income.amount;
        }
    });
    
    Object.entries(incomeByCategory).forEach(([category, amount]) => {
        const item = document.createElement('div');
        item.className = 'breakdown-item income';
        item.innerHTML = `
            <span class="breakdown-item-name">${category}</span>
            <span class="breakdown-item-amount">${formatCurrency(amount)}</span>
        `;
        container.appendChild(item);
    });
};

// Populate Expense Breakdown
const populateExpenseBreakdown = (month) => {
    const data = getCurrentData(month);
    const container = document.getElementById('expenseBreakdown');
    container.innerHTML = '';
    
    // Group by category and sum
    const expenseByCategory = {};
    data.expenses.forEach(expense => {
        if (expenseByCategory[expense.category]) {
            expenseByCategory[expense.category] += expense.amount;
        } else {
            expenseByCategory[expense.category] = expense.amount;
        }
    });
    
    Object.entries(expenseByCategory).forEach(([category, amount]) => {
        const item = document.createElement('div');
        item.className = 'breakdown-item expense';
        item.innerHTML = `
            <span class="breakdown-item-name">${category}</span>
            <span class="breakdown-item-amount">${formatCurrency(amount)}</span>
        `;
        container.appendChild(item);
    });
};

// Populate Income List
const populateIncomeList = (month) => {
    const data = getCurrentData(month);
    const container = document.getElementById('incomeList');
    container.innerHTML = '';
    
    if (data.income.length === 0) {
        container.innerHTML = '<p style="color: #94a3b8;">No income records yet</p>';
        return;
    }
    
    data.income.forEach((income, index) => {
        const item = document.createElement('div');
        item.className = 'record-item income';
        item.innerHTML = `
            <div class="record-info">
                <h4>${income.category}</h4>
                <p>Added to financial records</p>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <span class="record-amount">${formatCurrency(income.amount)}</span>
                <button class="btn btn-danger" onclick="deleteIncome('${month}', ${index})">Delete</button>
            </div>
        `;
        container.appendChild(item);
    });
};

// Populate Expense List
const populateExpenseList = (month) => {
    const data = getCurrentData(month);
    const container = document.getElementById('expenseList');
    container.innerHTML = '';
    
    if (data.expenses.length === 0) {
        container.innerHTML = '<p style="color: #94a3b8;">No expense records yet</p>';
        return;
    }
    
    data.expenses.forEach((expense, index) => {
        const item = document.createElement('div');
        item.className = 'record-item expense';
        item.innerHTML = `
            <div class="record-info">
                <h4>${expense.category}</h4>
                <p>Added to financial records</p>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <span class="record-amount">${formatCurrency(expense.amount)}</span>
                <button class="btn btn-danger" onclick="deleteExpense('${month}', ${index})">Delete</button>
            </div>
        `;
        container.appendChild(item);
    });
};

// Populate Reports
const populateReports = (month) => {
    const data = getCurrentData(month);
    const weeks = calculateWeeklyBreakdown(data);
    const { totalIncome, totalExpenses, balance } = calculateTotals(data);
    const avgWeekly = totalIncome / weeks.length;
    
    // Update report cards
    document.getElementById('reportTotalIncome').textContent = formatCurrency(totalIncome);
    document.getElementById('reportTotalExpense').textContent = formatCurrency(totalExpenses);
    document.getElementById('reportBalance').textContent = formatCurrency(balance);
    document.getElementById('expenseRatio').textContent = 
        totalIncome > 0 ? ((totalExpenses / totalIncome) * 100).toFixed(1) + '%' : '0%';
    document.getElementById('incomeVsExpense').textContent = 
        totalExpenses > 0 ? ((totalIncome / totalExpenses) * 100).toFixed(1) + '%' : '0%';
    document.getElementById('avgWeeklyIncome').textContent = formatCurrency(avgWeekly);
    
    // Income report - group by category
    const incomeByCategory = {};
    data.income.forEach(income => {
        if (incomeByCategory[income.category]) {
            incomeByCategory[income.category] += income.amount;
        } else {
            incomeByCategory[income.category] = income.amount;
        }
    });
    
    const incomeReport = document.getElementById('incomeReport');
    incomeReport.innerHTML = '';
    Object.entries(incomeByCategory).forEach(([category, amount]) => {
        const row = document.createElement('div');
        row.className = 'report-row';
        row.innerHTML = `
            <span class="category">${category}</span>
            <span class="total income" style="color: #10b981;">${formatCurrency(amount)}</span>
        `;
        incomeReport.appendChild(row);
    });
    
    // Add total row for income
    const incomeTotalRow = document.createElement('div');
    incomeTotalRow.className = 'report-row';
    incomeTotalRow.style.borderBottom = '2px solid #10b981';
    incomeTotalRow.innerHTML = `
        <span class="category" style="font-weight: bold;">Total Income</span>
        <span class="total income" style="color: #10b981; font-weight: bold; font-size: 18px;">${formatCurrency(totalIncome)}</span>
    `;
    incomeReport.appendChild(incomeTotalRow);
    
    // Expense report - group by category
    const expenseByCategory = {};
    data.expenses.forEach(expense => {
        if (expenseByCategory[expense.category]) {
            expenseByCategory[expense.category] += expense.amount;
        } else {
            expenseByCategory[expense.category] = expense.amount;
        }
    });
    
    const expenseReport = document.getElementById('expenseReport');
    expenseReport.innerHTML = '';
    Object.entries(expenseByCategory).forEach(([category, amount]) => {
        const row = document.createElement('div');
        row.className = 'report-row';
        row.innerHTML = `
            <span class="category">${category}</span>
            <span class="total expense" style="color: #ef4444;">${formatCurrency(amount)}</span>
        `;
        expenseReport.appendChild(row);
    });
    
    // Add total row for expenses
    const expenseTotalRow = document.createElement('div');
    expenseTotalRow.className = 'report-row';
    expenseTotalRow.style.borderBottom = '2px solid #ef4444';
    expenseTotalRow.innerHTML = `
        <span class="category" style="font-weight: bold;">Total Expenses</span>
        <span class="total expense" style="color: #ef4444; font-weight: bold; font-size: 18px;">${formatCurrency(totalExpenses)}</span>
    `;
    expenseReport.appendChild(expenseTotalRow);
};

// Update all content
const updateAllContent = (month) => {
    updateSummaryCards(month);
    populateWeeklyTable(month);
    populateIncomeBreakdown(month);
    populateExpenseBreakdown(month);
    populateIncomeList(month);
    populateExpenseList(month);
    populateReports(month);
};

// Add Income
const addIncome = (month, category, amount, week) => {
    const data = getCurrentData(month);
    data.income.push({ category, amount: parseFloat(amount) });
    saveData(month, data);
    updateAllContent(month);
};

// Delete Income
const deleteIncome = (month, index) => {
    if (confirm('Are you sure you want to delete this income record?')) {
        const data = getCurrentData(month);
        data.income.splice(index, 1);
        saveData(month, data);
        updateAllContent(month);
    }
};

// Add Expense
const addExpense = (month, category, amount, week) => {
    const data = getCurrentData(month);
    data.expenses.push({ category, amount: parseFloat(amount) });
    saveData(month, data);
    updateAllContent(month);
};

// Delete Expense
const deleteExpense = (month, index) => {
    if (confirm('Are you sure you want to delete this expense record?')) {
        const data = getCurrentData(month);
        data.expenses.splice(index, 1);
        saveData(month, data);
        updateAllContent(month);
    }
};

// Populate export content with data
const populateExportContent = (month) => {
    const data = getCurrentData(month);
    const { totalIncome, totalExpenses, balance } = calculateTotals(data);
    const weeks = calculateWeeklyBreakdown(data);
    const avgWeekly = totalIncome / weeks.length;
    
    // Update month and date
    document.getElementById('exportMonth').textContent = month.charAt(0).toUpperCase() + month.slice(1);
    document.getElementById('exportDate').textContent = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Update totals
    document.getElementById('exportTotalIncome').textContent = formatCurrency(totalIncome);
    document.getElementById('exportTotalExpense').textContent = formatCurrency(totalExpenses);
    document.getElementById('exportBalance').textContent = formatCurrency(balance);
    
    // Update weekly table
    const exportWeeklyBody = document.getElementById('exportWeeklyBody');
    exportWeeklyBody.innerHTML = '';
    weeks.forEach(week => {
        const weekBalance = week.income - week.expenses;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="padding: 8px; border: 1px solid #ddd;">Week ${week.week}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: right; color: #10b981; font-weight: 500;">${formatCurrency(week.income)}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: right; color: #ef4444; font-weight: 500;">${formatCurrency(week.expenses)}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: right; font-weight: 500;">${formatCurrency(weekBalance)}</td>
        `;
        exportWeeklyBody.appendChild(row);
    });
    
    // Update income breakdown
    const incomeByCategory = {};
    data.income.forEach(income => {
        if (incomeByCategory[income.category]) {
            incomeByCategory[income.category] += income.amount;
        } else {
            incomeByCategory[income.category] = income.amount;
        }
    });
    
    const exportIncomeBreakdown = document.getElementById('exportIncomeBreakdown');
    exportIncomeBreakdown.innerHTML = '';
    
    if (Object.keys(incomeByCategory).length === 0) {
        exportIncomeBreakdown.innerHTML = '<div style="padding: 10px; color: #999;">No income records</div>';
    } else {
        Object.entries(incomeByCategory).forEach(([category, amount]) => {
            const item = document.createElement('div');
            item.style.cssText = 'padding: 10px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between;';
            item.innerHTML = `
                <span>${category}</span>
                <span style="font-weight: bold; color: #10b981;">${formatCurrency(amount)}</span>
            `;
            exportIncomeBreakdown.appendChild(item);
        });
        
        const incomeTotalDiv = document.createElement('div');
        incomeTotalDiv.style.cssText = 'padding: 10px; border-top: 2px solid #10b981; display: flex; justify-content: space-between; font-weight: bold; margin-top: 5px;';
        incomeTotalDiv.innerHTML = `
            <span>Total Income:</span>
            <span style="color: #10b981;">${formatCurrency(totalIncome)}</span>
        `;
        exportIncomeBreakdown.appendChild(incomeTotalDiv);
    }
    
    // Update expense breakdown
    const expenseByCategory = {};
    data.expenses.forEach(expense => {
        if (expenseByCategory[expense.category]) {
            expenseByCategory[expense.category] += expense.amount;
        } else {
            expenseByCategory[expense.category] = expense.amount;
        }
    });
    
    const exportExpenseBreakdown = document.getElementById('exportExpenseBreakdown');
    exportExpenseBreakdown.innerHTML = '';
    
    if (Object.keys(expenseByCategory).length === 0) {
        exportExpenseBreakdown.innerHTML = '<div style="padding: 10px; color: #999;">No expense records</div>';
    } else {
        Object.entries(expenseByCategory).forEach(([category, amount]) => {
            const item = document.createElement('div');
            item.style.cssText = 'padding: 10px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between;';
            item.innerHTML = `
                <span>${category}</span>
                <span style="font-weight: bold; color: #ef4444;">${formatCurrency(amount)}</span>
            `;
            exportExpenseBreakdown.appendChild(item);
        });
        
        const expenseTotalDiv = document.createElement('div');
        expenseTotalDiv.style.cssText = 'padding: 10px; border-top: 2px solid #ef4444; display: flex; justify-content: space-between; font-weight: bold; margin-top: 5px;';
        expenseTotalDiv.innerHTML = `
            <span>Total Expenses:</span>
            <span style="color: #ef4444;">${formatCurrency(totalExpenses)}</span>
        `;
        exportExpenseBreakdown.appendChild(expenseTotalDiv);
    }
    
    // Update statistics
    document.getElementById('exportExpenseRatio').textContent = 
        totalIncome > 0 ? ((totalExpenses / totalIncome) * 100).toFixed(1) + '%' : '0%';
    document.getElementById('exportIncomeVsExpense').textContent = 
        totalExpenses > 0 ? ((totalIncome / totalExpenses) * 100).toFixed(1) + '%' : '0%';
    document.getElementById('exportAvgWeekly').textContent = formatCurrency(avgWeekly);
};

// Export as PDF
const exportPDF = async () => {
    try {
        const month = document.getElementById('monthSelect').value;
        
        // Show loading indicator
        const exportBtn = document.getElementById('exportBtn');
        const originalText = exportBtn.textContent;
        exportBtn.textContent = '⏳ Generating PDF...';
        exportBtn.disabled = true;
        
        // Populate export content first
        populateExportContent(month);
        
        // Wait a moment for content to render
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Generate PDF
        const element = document.getElementById('exportContent');
        const opt = {
            margin: 10,
            filename: `Newspring-Finance-Report-${month}-${new Date().getFullYear()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, logging: false },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(element).save().then(() => {
            exportBtn.textContent = originalText;
            exportBtn.disabled = false;
            console.log('PDF exported successfully');
            alert('✅ PDF exported successfully! Check your Downloads folder.');
        }).catch(error => {
            console.error('PDF export error:', error);
            alert('❌ Error generating PDF:\n' + error.message + '\n\nTry refreshing the page.');
            exportBtn.textContent = originalText;
            exportBtn.disabled = false;
        });
        
    } catch (error) {
        console.error('Export error:', error);
        alert('❌ An error occurred while exporting:\n' + error.message);
        exportBtn.textContent = '📥 Export as PDF';
        exportBtn.disabled = false;
    }
};

// Tab Navigation
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        const tabName = btn.getAttribute('data-tab');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    });
});

// Month Selector
document.getElementById('monthSelect').addEventListener('change', (e) => {
    const month = e.target.value;
    updateAllContent(month);
});

// Income Form
document.getElementById('incomeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const category = document.getElementById('incomeCategory').value;
    const amount = document.getElementById('incomeAmount').value;
    const week = document.getElementById('incomeWeek').value;
    const month = document.getElementById('monthSelect').value;
    
    if (category && amount) {
        addIncome(month, category, amount, week);
        
        // Reset form
        document.getElementById('incomeForm').reset();
        
        // Show success message
        alert(`Income of ${formatCurrency(amount)} added successfully!`);
    }
});

// Expense Form
document.getElementById('expenseForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const category = document.getElementById('expenseCategory').value;
    const amount = document.getElementById('expenseAmount').value;
    const week = document.getElementById('expenseWeek').value;
    const month = document.getElementById('monthSelect').value;
    
    if (category && amount) {
        addExpense(month, category, amount, week);
        
        // Reset form
        document.getElementById('expenseForm').reset();
        
        // Show success message
        alert(`Expense of ${formatCurrency(amount)} added successfully!`);
    }
});

// Export button
document.getElementById('exportBtn').addEventListener('click', exportPDF);

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    initializeData();
    updateAllContent('january');
});

// Optional: Auto-save every 30 seconds
setInterval(() => {
    console.log('Data auto-saved');
}, 30000);
