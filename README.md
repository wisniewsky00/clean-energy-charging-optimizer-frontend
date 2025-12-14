# Clean Energy Charging Optimizer – Frontend

Frontend application for visualizing the UK electricity energy mix and
calculating the optimal electric vehicle charging window based on clean energy usage.

The application consumes forecast data from a Spring Boot backend and allows
users to select a charging duration (1–6 hours) to find the time window with
the highest share of clean energy.

---

## Technologies
- React
- TypeScript
- Vite
- Axios
- Recharts
- Vitest
- @testing-library/react
- CSS

---

## Features
- Visualization of the UK energy mix using pie charts
- Display of clean vs non-clean energy sources
- Charging time optimization (1–6 hours)
- Forecast-based calculations (next 48 hours starting at midnight UTC)
---

## Configuration

Create an environment file in the project root:

```env
VITE_API_URL=http://localhost:8080/api
```

## Running the Application Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```
---

## Tests 
Run tests:
```bash
npx vitest
```
---