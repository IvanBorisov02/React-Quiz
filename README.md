# React Quizzer

**React Quizzer** е модерен SPA, създаден за провеждане на интерактивни куизове, който симулира бекенд чрез `json-server`.

## 🚀 Основна функционалност

- **Динамично зареждане на въпроси**  
  Въпросите се fetch-ват от локален REST API (`http://localhost:9000/questions`), работещ на `json-server`.

- **Потребителски поток**  
  1. **Start Screen** – бутон “Start Quiz”  
  2. **Quiz Screen** – задава въпрос, показва възможни отговори  
  3. **Progress Bar** – визуализира напредъка (брой отговорени въпроси / общ брой)  
  4. **Timer** – обратно отброяване за всеки въпрос  
  5. **Finish Screen** – показва точките и най-висок резултат, бутон “Restart Quiz”

- **Точки и най-висок резултат**  
  Изчисляват се динамично при всеки отговор, като се сравняват с локално съхранения “high score” (например в `localStorage`).

- **Рестарт**  
  Може да рестартирате куиза, като състоянието се нулира и API се презареждат въпросите.

## 🛠 Технологичен стек и архитектура

| Компонент / Hook        | Технология / Подход      |
|-------------------------|--------------------------|
| **React Context API**   | Глобално състояние на куиза (въпроси, текущ индекс, точки, статус) |
| **useReducer**          | Централизирана логика за промяна на state (actions: `loading`, `ready`, `answer`, `next`, `finish`, `restart`, `tick`) |
| **useEffect**           | Асинхронно fetch-ване на данни от API при стартиране или рестарт |
| **json-server**         | Локален фейк REST API за въпроси (CRUD за разработка и тестове) |
| **Компонентен подход**  |  
  - `Header`, `StartScreen`, `Question`, `ProgressBar`, `Timer`, `FinishScreen`, `Loader`, `Error`, `Button`  
  - Всеки компонент получава данни и dispatch чрез контекст |
| **Derived State**       | Изчислява `numOfQuestions`, `totalPoints`, `highScore` на база текущ state |
| **Статуси**             | `loading` → `ready` → `active` → `finished` → (`ready` при рестарт) |

## ⚙️ Инсталация и стартиране

```bash
# Клонирай репото
git clone https://github.com/your-username/react-quizzer.git
cd react-quizzer

# Инсталирай зависимости
npm install

# Стартирай fake API (json-server)
npm run server
# (предполага се, че в package.json има скрипт "server": "json-server --watch db.json --port 9000")

# В нов терминал стартирай dev сървър
npm start
