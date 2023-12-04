import styles from "./Pagination.module.css"

export const Pagination = ({ prevPage, nextPage, page, setPage, totalPages }) => {
    const getPageNumbersToShow = () => {
      const range = 1; // Кількість сторінок, які ми хочемо відобразити перед і після поточної сторінки
      const start = Math.max(1, page - range); // визначення початкової сторінки діапазону
      const end = Math.min(totalPages, page + range); // визначення початкової сторінки діапазону
  
      let pagesToShow = [...Array(end - start + 1).keys()].map((el) => start + el);
      //Створення масиву сторінок для відображення в діапазоні від start до end.
      if (start > 1) {
        // Додавання першої сторінки, якщо поточна сторінка віддалена від неї
        pagesToShow = [1, ...pagesToShow];
      }
      if (end < totalPages) {
        // Додавання останньої сторінки, якщо поточна сторінка віддалена від неї
        pagesToShow = [...pagesToShow, totalPages];
      }
  
      return pagesToShow;
    };

    if(totalPages > 1) {
        return (
            <div className={styles.pagination}>
              <button onClick={prevPage} className={`${styles.page} ${styles.prevNextButtons}`}>
                  &lt;
              </button> 
              {[...getPageNumbersToShow()].map((el) => (
                <button
                  onClick={() => setPage(el)}
                  key={el}
                  className={`${styles.page} ${page === el ? styles.active : styles.inactive}`}
                >
                  {el}
                </button>
              ))}
              <button onClick={nextPage} className={`${styles.page} ${styles.prevNextButtons}`}>
                  &gt;
              </button>
            </div>
          );
    }
  };
  