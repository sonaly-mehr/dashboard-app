## Getting Started

First, install the packages -> npm install

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Deployed link on Vercel-> 


DISCUSSION: 

1.Frontend Development:

- Utilized Next.js 14 with the App Router to structure the application efficiently.
- Employed Tailwind CSS for styling to ensure a responsive and modern user interface.
- Integrated Recharts for visualizing metrics data in an engaging format, enhancing user interaction and    understanding.

2.Backend Setup: 

- Used Supabase as the backend service to handle user authentication and data storage.

3.Authentication:

- Utilized Supabase's database features to fetch metrics data required for the dashboard.
- Structured the database to optimize data retrieval for analytics.


Challenges Faced: 

1.Integration Issues:
- Faced challenges in integrating Supabase authentication with the Next.js app, particularly with session management and redirect logic.

2.Data Fetching:
- Ensuring that data was fetched correctly presented some difficulties, particularly with handling async operations and error management.

3.Responsive Design:
- Designing a responsive dashboard that accommodates various screen sizes while ensuring a seamless user experience proved to be complex. Tailwind CSS required meticulous configuration to achieve the desired layout

Potential Improvements:

1.Enhanced Error Handling:
- Implement more robust error handling and logging mechanisms to provide clearer insights during data fetching and authentication processes.

2.User Experience (UX) Enhancements:
- Introduce loading indicators and skeleton screens while data is being fetched to improve user experience.

3.Optimized Data Structure:
- Review and optimize the Supabase database structure to minimize data retrieval times and improve query performance.