# Application

The purpose of this application is to update user balances once every midnight to reflect the balance for the day, depending on the type of user:

- Monthly worker
- Daily worker

Key of considerations for the solutions:

- User Balance: The application manages user balances, ensuring accurate reflection of financial status.
- Transaction Logging: All actions related to the user balance must be tracked. (credit/withdrawals).
- Scalability: As the application deals with potentially large volumes of information, It should be capable of handling increasing data loads efficiently.

## Topic

- [Height Level Design](#height-level-design)
- [Structure Folder](#structure-folder)
- [Getting Start](#getting-start)
- [How To Test](#how-to-test)

# Height Level Design

![myImage](https://github.com/Kim1090/img-for-readme/blob/master/diagrame.png?raw=true)
![myImage](https://github.com/Kim1090/img-for-readme/blob/master/database-schema.png?raw=true)

### 1. Overview

- This service responsible for updating user balances at once every midnight to reflect the balance for the day with type of user monthly and daily worker

### 2. Architecture:

- #### Backend Components:

  - Node.js + TypeScript
  - Express.js
  - PostgreSQL
  - RabbitMQ
  - Cronjob

### 3. Modules and Components:

- #### Cronjob Setup

  - A cronjob is configured to run every midnight.
  - It triggers a producer function to fetch user data from PostgreSQL and publish it to RabbitMQ as a message.

- #### Message Consumption:

  - A consumer service listens for messages on the RabbitMQ queue.
  - Upon receiving a message, it triggers the following processes
    - Calculate user credit amount: Calculate user credit amount per day depending of user type.
    - User Transaction Creation: Creates transaction records in the database for each user with status 'credit'.
    - User Balance Calculation: Calculates the updated balance for each user based on their transaction history of the month.

### 4. Interactions:

- #### Cronjob to RabbitMQ (Producer):

  - Fetches user data from PostgreSQL.
  - Publishes user data as messages to RabbitMQ queue.

- #### RabbitMQ to Consumer:

  - Listens for incoming messages on the RabbitMQ queue.
  - Triggers transaction creation and balance calculation processes.

## Structure Folder

```
salary-hero/
├── README.md
├── docker-compose.yml
├── jest.config.ts
├── package-lock.json
├── package.json
├── src
│   ├── app.ts
│   ├── config
│   │   └── env.ts
│   ├── controllers
│   │   └── transactionsController.ts
│   ├── cron
│   │   └── userBalance.ts
│   ├── database
│   │   ├── index.ts
│   │   ├── migrations
│   │   │   └── 20240503150540_create-all-table.ts
│   │   ├── models
│   │   │   ├── transactionsModel.ts
│   │   │   ├── userBalanceModel.ts
│   │   │   └── userModel.ts
│   │   └── seeds
│   │       ├── 01_companies.ts
│   │       ├── 02_marital_status.ts
│   │       ├── 03_salary_type.ts
│   │       ├── 04_users.ts
│   │       ├── 05_user_balance.ts
│   │       └── 06_transactions.ts
│   ├── knexfile.ts
│   ├── server.ts
│   ├── services
│   │   └── rabbitMQ
│   │       ├── consumer.ts
│   │       ├── index.ts
│   │       └── producer.ts
│   └── utils
│       └── calculateDate.ts
├── tests
│   └── unit
│       ├── controllers
│       │   └── userBalanceController.spec.ts
│       └── utils
│           └── calculateDate.spec.ts
└── tsconfig.json
```

# Getting Start

#### 1.Setup the project by clone the repository:

```
git clone https://github.com/Kim1090/salary-hero-backend.git
cd salary-hero-backend
```

The service requires 2 dependencies:

- PostgreSQL Database and
- RabbitMQ.

Please ensure that you have them installed. If not, you can use Docker Compose, which is already prepared, and follow the steps for installation.

```
docker -v
docker compose up -d
```

- .env.docker prepare for docker dependency only
- when install dependencies success, you can try to access

  - RabbitMQ: http://localhost:15672
  - PostgreSQL database: http://localhost:5432 (you can use any postgres client tools to access)

> [!NOTE] Once you've finished setting up the dependencies, remember to copy the values from .env.docker and replace the corresponding values in the .env file of the service in the following step.

#### 2.Install dependencies:

```
npm ci
```

#### 3.Set up the environment variables: Copy an .env.example file in the root directory by using this command, then change the variables value

```
cp .env.example .env
```

in case use dependencies by docker compose please make sure that you replace the values following in .env.docker file

#### 4.Make sure you database and RabbitMQ already working well then:

```
npm install knex -g
knex migrate:latest --knexfile ./src/knexfile.js
knex seed:run --knexfile ./src/knexfile.js
```

Good to go all data has already been prepared.

#### 5.Start the server locally:

```
npm start

```

OR

```
npm run dev
```

#### 6.Run unit test by:

```
npm run test
```

> [!TIP]
> The cronjob schedule running every day at midnight, you can test by change the config .env
> with WORKER_SCHEDULE="\*/15 \* \* \* \* \*", run the cron job every 15 second

# How To Test

!Here is documentation on test cases and how to test. [Documentation For Test](https://docs.google.com/document/d/1UIxeRDpuSZPfQqO_GzKe4nAIHSiJOvQiPXaQrmAsydo/edit).

## Contributing

Feel free to contribute to this starter project by submitting pull requests or suggesting improvements. Your contributions are greatly appreciated!

## License

This project is licensed under the MIT License.
