# Timeslot Reservation System (Frontend)

This project is an Angular-based frontend for a timeslot reservation system.
It is designed for businesses that require appointment and schedule management (such as Beauty Salons, Hair Salons, or similar service-based businesses).

The backend is implemented separately in Java (Spring Boot) with PostgreSQL.

## Tech Stack

- Angular (latest version)
- RxJS for reactive programming
- NgRx (Store) for state management
- REST API (integrated with backend Spring Boot project)

## Features

### Services (Treatments/Procedures)

- Create new services
- Edit existing services
- Delete services
- List all available services

### Absences

- Create absences (periods when appointments cannot be scheduled)

### Events & Overview

- Overview page with all scheduled events
- Confirmed appointments
- Absences

### Appointment Creation (Multi-step flow)

- Select service(s) – used to calculate total duration
- Select time slot – list of available times based on chosen services
- Enter reservation details – name, email/Instagram, or similar contact info

### Pending Appointments

- View all pending appointment requests
- Accept or Decline appointments

## Missing Features (Planned)

- Editing and deleting absences
- Authentication & Authorization
- JWT-based security (Spring Security integration)
- Better CSS adjustments for responsive design
  

