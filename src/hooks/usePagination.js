import { useState } from "react";

const usePagination = ({ contentPerPage, count }) => {
  const [page, setPage] = useState(1); // поточна сторінка
  const pageCount = Math.ceil(count / contentPerPage); // кількість сторінок
  const lastContentIndex = page * contentPerPage; // індекс останнього елемента на поточній сторінці
  const firstContentIndex = lastContentIndex - contentPerPage; // індекс першого елемента на поточній сторінці

  const changePage = (direction) => { // функція зміни сторінки
    setPage((state) => { // змінюємо стан
      if (direction) { // якщо хочемо перейти до наступної сторінки
        if (state === pageCount) { // якщо це остання сторінка
          return state; // повертаємо поточну сторінку
        }
        return state + 1; // збільшуємо поточну сторінку на 1
      } else { // якщо хочемо перейти на попередню сторінку
        if (state === 1) { // якщо це перша сторінка
          return state; // повертаємо поточну сторінку
        }
        return state - 1; // зменшуємо поточну сторінку на 1
      }
    });
  };

  const setPageSAFE = (num) => { // встановлення отриманої сторінки
    if (num > pageCount) { // якщо сторінка більша, за кількість сторінок 
      setPage(pageCount); // встановлюємо останню сторінку
    } else if (num < 1) { // якщо сторінка менша, за одиницю
      setPage(1); // встановлюємо першу сторінку
    } else {
      setPage(num); // встановлюємо отриману сторінку
    }
  };

  return { // повертаємо необхідні значення та функції
    totalPages: pageCount,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPage: setPageSAFE,
    firstContentIndex,
    lastContentIndex,
    page,
  };
};

export default usePagination;