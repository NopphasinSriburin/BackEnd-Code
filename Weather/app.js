const apiKey = 'cc0364f11dc149992d0f12e47c833df6'; // แทนที่ด้วย API Key ของคุณ

async function getWeather() {
    const city = document.getElementById('cityInput').value; // รับชื่อเมืองจาก input
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    // สร้าง URL สำหรับขอข้อมูลจาก API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url); // ส่งคำขอไปยัง API
        if (!response.ok) {
            // ตรวจสอบสถานะของการตอบสนอง
            if (response.status === 404) {
                alert('City not found');
            } else {
                alert('Error fetching weather data');
            }
            return;
        }

        const data = await response.json(); // แปลงผลลัพธ์เป็น JSON
        console.log(data); // แสดงข้อมูลที่ได้รับจาก API ในคอนโซล

        // ตรวจสอบข้อมูลที่ได้รับจาก API ก่อนแสดงผล
        if (data && data.main && data.wind) {
            // แสดงข้อมูลสภาพอากาศในหน้าเว็บ
            const weatherData = `
                <h2>${data.name}</h2>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Humidity: ${data.main.humidity} %</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            document.getElementById('weatherData').innerHTML = weatherData;
        } else {
            alert('Incomplete weather data received');
        }
    } catch (error) {
        alert('Error fetching weather data');
        console.error(error);
    }
}

const cities = ["Bangkok", "Berlin", "Cairo", "Dubai", "Hong Kong", "London", "New York", "Paris", "Sydney", "Tokyo"]; // ตัวอย่างชื่อเมือง

function autocompleteCity() {
    const input = document.getElementById('cityInput');
    const val = input.value;
    const autocompleteList = document.getElementById('autocomplete-list');
    
    autocompleteList.innerHTML = ''; // ล้างรายการเก่า

    if (!val) return false;

    cities.forEach(city => {
        if (city.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
            const item = document.createElement('div');
            item.innerHTML = `<strong>${city.substr(0, val.length)}</strong>${city.substr(val.length)}`;
            item.addEventListener('click', () => {
                input.value = city; // ตั้งค่า input เป็นชื่อเมืองที่เลือก
                autocompleteList.innerHTML = ''; // ล้างรายการเมื่อเลือกเมือง
            });
            autocompleteList.appendChild(item);
        }
    });
}
