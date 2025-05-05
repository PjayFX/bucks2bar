// This file is intentionally left blank.

document.addEventListener("DOMContentLoaded", function () {
    // Function to retrieve income and expenses values for each month
    function getMonthlyData() {
        const months = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
        ];

        const incomeData = months.map(month => {
            const incomeInput = document.getElementById(`${month}-income`);
            return incomeInput ? parseFloat(incomeInput.value) || 0 : 0; // Default to 0 if input is empty or not found
        });

        const expensesData = months.map(month => {
            const expensesInput = document.getElementById(`${month}-expenses`);
            return expensesInput ? parseFloat(expensesInput.value) || 0 : 0; // Default to 0 if input is empty or not found
        });

        return { incomeData, expensesData };
    }

    // Initialize the chart
    const ctx = document.getElementById('barChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ],
            datasets: [
                {
                    label: 'Income',
                    data: [], // Placeholder, will be updated dynamically
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Expenses',
                    data: [], // Placeholder, will be updated dynamically
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Monthly Income vs Expenses',
                    font: {
                        size: 24
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Update chart data when inputs change
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', () => {
            const { incomeData, expensesData } = getMonthlyData();
            chart.data.datasets[0].data = incomeData;
            chart.data.datasets[1].data = expensesData;
            chart.update();
        });
    });

    // Initial chart update
    const { incomeData, expensesData } = getMonthlyData();
    chart.data.datasets[0].data = incomeData;
    chart.data.datasets[1].data = expensesData;
    chart.update();
});