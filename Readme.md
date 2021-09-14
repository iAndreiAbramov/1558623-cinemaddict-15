# Проект «Киноман»

Настоящий проект выполнен в рамках курса "JavaScript. Архитектура клиентских приложений" от HTML Academy.

В качестве исходного материала были предоставлены сверстанные элементы страницы, а также техническое задание.

Цель проекта - превратить страницу в Single Page Application на JavaScript
 и реализовать функционал страницы в соотвествии с техническим заданием. Обязательным требованием к реализации было использование архитектурного паттерна MVP.

В итоге был реализован следующий функционал:

## Описание функциональности
Приложение состоит из 2-х экранов: 

"Фильмы"
 ![](./main-poster.PNG)
 
 и "Статистика"
![](./stats-poster.PNG)
  
### 1.1 Общий контейнер
В правом верхнем углу шапки отображается звание пользователя. Звание зависит от количества просмотренных фильмов, вычисляется при загрузке приложения и может изменяться в ходе использования пользователем приложения (при добавлении или удалении фильмов из просмотренных).

* 0 — блок со званием не отображается;
* от 1 до 10 — novice;
* от 11 до 20 — fan;
* от 21 и выше — movie buff.

В правом углу подвала выводится информация о количестве фильмов в сервисе. Информация обновляется один раз — при загрузке приложения.

### 1.2 Фильмы
После загрузки приложения в списке отображается не более 5 карточек фильмов.

Показ оставшихся фильмов выполняется нажатием на кнопку «Show more». При нажатии показываются очередные 5 фильмов или оставшиеся фильмы, если их количество меньше 5.

После показа всех карточек с фильмами, кнопка «Show more» скрывается.

Любое изменение фильтра или сортировки, а также переключение на экран статистики и обратно, сбрасывает счётчик показанных фильмов и отсчёт начинается заново.

В случае отсутствия фильмов вместо списка отображается текст: «There are no movies in our database».

### 1.3 Карточка фильма
Карточки фильмов представлены в двух вариантах: стандартный (на главном экране, в блоках «Top rated movies» и «Most commented») и расширенный (попап с описанием фильма).

В стандартном варианте карточка с фильмом содержит краткую информацию о фильме.
Если описание фильма больше 140 символов, то в карточке отображается 139 символов описания и знак многоточие (…).

В карточке фильма отображается блок с кнопками управления:

* «Add to watchlist» — добавляет/удаляет фильм из списка к просмотру;
* «Already watched» — помечает фильм как просмотренный/непросмотренный;
* «Add to favorites» — добавляет/удаляет фильм в избранное.

Клик по обложке фильма, заголовку, количеству комментариев открывает попап с подробной информацией о фильме.

Фильм может относиться к нескольким жанрам. Если фильм относится к нескольким жанрам, выводите «Genres», иначе «Genre».

В попапе отображается блок с кнопками управления:

* «Add to watchlist» — добавляет/удаляет фильм из списка к просмотру;
* «Already watched» — помечает фильм как просмотренный/непросмотренный;
* «Add to favorites» — добавляет/удаляет фильм в избранное.

В заголовке «Comments» отображается количество комментариев к фильму. Например: «Comments 8».

Любое изменение информации о фильме в попапе должно отображаться в списке фильмов мгновенно. При изменении информации попап не должен закрываться самовольно.

Попап можно закрыть нажатием на кнопку закрытия в правом верхнем углу (крестик) или нажатием на клавиатуре кнопки «Esc». При закрытии попап удаляется из DOM.

Одновременно может быть открыт только один попап.

### 1.4 Комментарии
Список комментариев к фильму и форма добавления нового комментария доступны в попапе. Комментарии загружаются при открытии попапа.

Каждый комментарий состоит из:

* Текст комментария;
* Эмоция;
* Автор комментария;
* Дата комментария;
* Кнопка удаления.
* Дата комментария отображается в формате год/месяц/день часы:минуты (например «2019/12/31 23:59»).

Для добавления нового комментария пользователь заполняет текст комментария и выбирает эмоцию (один вариант из: smile, sleeping, puke, angry). Имя автора формируется случайным образом на сервере, с клиента оно не передаётся. Дата также приходит с сервера.

Введённые пользователем данные экранируются.

Отправка формы осуществляется нажатием комбинации клавиш ```Ctrl/Command + Enter```.

Пользователь может удалить произвольный комментарий. Комментарий удаляется нажатием на кнопку «Delete», расположенную в блоке с комментарием.

### 1.5 Фильтры
В приложении предусмотрено несколько фильтров:

* «All movies» — все фильмы;
* «Watchlist» — фильмы, добавленные в список к просмотру (Watchlist);
* «History» — просмотренные фильмы (Already watched);
* «Favorites» — фильмы, добавленные в избранное (Favorites).
Количество фильмов, соответствующих фильтру отображается справа в элементе с фильтром. Для фильтра «All movies» количество не отображается.

Информация о количестве фильмов, соответствующих каждому фильтру доступна сразу, без необходимости применения фильтра.

Если фильтру соответствует больше 5 фильмов, то в списке фильмов по этому фильтру отображается первые 5 фильмов, а остальные отображаются по нажатию на кнопку «Show more», как и в списке фильмов «All movies».

Если список фильмов был отфильтрован, и какой-то из фильмов перестал соответствовать критериям фильтрации (например пользователь убрал отметку «Add to favorites» в списке по фильтру «Favorites»), карточка этого фильма должна быть моментально удалена из списка. Это удаление карточки не должно каким-либо образом ломать логику кнопки «Show more» или нарушать порядок сортировки.

Если в отфильтрованном списке были удалены все карточки, вместо списка отображается соответствующий текст. Например, если пользователь убрал отметки «Add to favorites» во всех фильмах в списке по фильтру «Favorites», должна появиться заглушка «There are no favorite movies now». Все фразы приведены в файле в директории с разметкой.

### 1.6 Сортировка
Пользователю доступна возможность сортировки фильмов по дате выхода (клик по ссылке «Sort by date») и рейтингу (клик по ссылке «Sort by rating»). Сортировка работает в одном направлении — от максимального к минимальному: при сортировке по дате выхода в начале списка будут самые новые фильмы, при сортировке по рейтингу — с самым высоким рейтингом.

Для отмены сортировки и возвращению к исходному порядку пользователь кликает по ссылке «Sort by default».

При смене фильтра или переключении с экрана с фильмами на экран статистики и обратно сортировка сбрасывается на состояние «Sort by default».

### 1.7 Статистика
Статистика в приложении представлена в виде диаграммы, показывающей количество просмотренных фильмов в разрезе жанров за определённый период. Если у фильма больше одного жанра, фильм учитывается в статистике по каждому из жанров.

Помимо диаграммы, в разделе «Статистика» отображаются:

* Звание пользователя, если таковое имеется;
* Общее количество просмотренных пользователем фильмов;
* Затраченное время на просмотр всех фильмов;
* Любимый жанр.

Пользователь может сформировать статистику за несколько предопределённых периодов:

* All time;
* Today;
* Week;
* Month;
* Year.

При смене периода диаграмма перерисовывается, а все показатели, кроме звания пользователя, пересчитываются.

Если для статистики недостаточно данных (например, пользователь ничего не успел посмотреть), то для числовых значений статистики выводится «0», а для текстовых (Любимый жанр) ничего не показывается. Диаграмма также не отображается.

### 1.8 Взаимодействие с сервером
Интерфейс должен реагировать на отправку любого запроса к серверу. Примеры реакции описаны в соответствующих пунктах ТЗ.

При отправке комментария, форма, содержащая текст комментария должна быть заблокирована. Если запрос на отправку комментария выполнился успешно, то комментарий должен быть добавлен в список комментариев. Форму добавления комментария нужно очистить и разблокировать.

При возникновении ошибки в момент отправки комментария, форма, содержащая текст комментария, должна быть разблокирована и к ней применяется эффект «покачивание головой». Стили для эффекта есть в проекте. В этом случае форму очищать не надо.

Обновление любого элемента в DOM происходят только после успешного выполнения запроса на сервере.

Url и структуры данных для различных типов запросов к серверу указаны в соответствующих пунктах ТЗ.

### 1.9 Обратная связь интерфейса
На время загрузки вместо карточек фильмов нужно вывести информационное сообщение.

При нажатии на кнопку удаления комментария «Delete» её заголовок изменяется на «Deleting...», а сама кнопка блокируется. Если при выполнении запроса к серверу возникла ошибка, заголовок нужно вернуть к изначальному — «Delete», а кнопку разблокировать.

В момент отправки запроса на создание комментария форма блокируется от внесения изменений. Разблокировка формы происходит после завершения выполнения запроса (неважно, успешно выполнен запрос или нет).

Если запрос не удалось выполнить (сервер недоступен, произошла ошибка), форма создания остаётся открытой, к ней применяется эффект «покачивание головой».

Обновление элементов (удаление комментариев, обновление информации о фильме и так далее) в DOM происходит после успешного выполнения запроса к серверу.

### 1.10 Оффлайн режим
Приложение должно кэшировать статические ресурсы (разметку, стили, изображения, шрифты) с помощью ServiceWorker и уметь их отображать без использования сети интернет.

При переходе в оффлайн-режим выводится индикатор для пользователя о том, что нет сети. Внешний вид индикатора - придумать самостоятельно. Добавление и удаление комментариев в режиме оффлайн недоступно. При этом остаётся возможность добавления фильмов в списки «Watchlist», «Already watched», «Favorites».

В случае, если доступ к сети пропал в процессе написания комментария, это действие должно завершиться с ошибкой, на форме должен сработать эффект покачивания головой, а пользователь должен быть уведомлен, что нет сети. Возможность открыть и закрыть попап в случае отсутствия сети, сохраняется.

При появлении доступа к сети все изменения должны синхронизироваться с сервером.

### 2. Дополнительные задания
На главном экране в блоке «Top rated movies» и «Most commented» отображаются по две карточки фильмов. В блоке «Top rated movies» — фильмы с наивысшим рейтингом. В блоке «Most commented» — фильмы с наибольшим количеством комментариев. Если у всех фильмов одинаковый рейтинг или одинаковое количество комментариев, берутся два случайных фильма соответственно.

Блок «Top rated movies» не отображается, если у всех фильмов рейтинг равен нулю.

Блок «Most commented» не отображается, если отсутствуют фильмы с комментариями.

Блок «Most commented» обновляется во время работы с приложением при добавлении или удалении пользователем комментариев.

Реализовать вывод даты публикации комментария в человеческом формате (например «now», «a few minutes ago», «8 years ago» и т.д.) вместо формата, предложенного в пункте 1.4 техзадания.
