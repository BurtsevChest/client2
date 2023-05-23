// Видение бизнесс-процессов
// Обьект бизнесс-процесса
export const reglament = {
   name: 'Новый лендинг',
   finalPhase: 'Проверка данных лендинга' || 'Проверка',
   currentPhase: 1,
   phaseList: [
      {
         name: 'SEO ТЗ',
         responsible_id: 4,
         // Могут быть разные типы прикладываемого результата. Текст, файл, или PullRequest
         result: {
            type: 'file',
            name: 'SEO ТЗ',
            value: ''
         }
      },
      {
         name: 'Подготовка текста лендинга',
         responsible_id: 6,
         result: {
            name: 'Текст лендинга',
            type: 'file',
            value: ''
         }
      },
      {
         name: 'Подготовка макета',
         responsible_id: 6,
         result: {
            name: 'Макет',
            type: 'text',
            value: ''
         }
      }
   ]
}

// reglament нужно сделать дополнительным полем у тасков
export const task = {
   task_id: 3,
   creator_title: 'Джейсон ХренЗавалишь Стетхем',
   title: 'Тестовый таск',
   description: "тестим канбану",
   creator_id: 523,
   responsible_id: '',
   date_of_creation: new Date(),
   date_of_completion: new Date(),
   parent_id: null,
   status_task_id: null,
   reglament: {
      creatorReglament: 1,
      name: 'Новый лендинг',
      finalPhase: 'Проверка данных лендинга' || 'Проверка' ,
      currentPhase: 1,
      phaseList: [
         {
            name: 'SEO ТЗ',
            responsible_id: 4,
            // Могут быть разные типы прикладываемого результата. Текст, файл, или PullRequest
            result: {
               type: 'file',
               name: 'SEO ТЗ',
               value: ''
            }
         },
         {
            name: 'Подготовка текста лендинга',
            responsible_id: 6,
            result: {
               name: 'Текст лендинга',
               type: 'file',
               value: ''
            }
         },
         {
            name: 'Подготовка макета',
            responsible_id: 6,
            result: {
               name: 'Макет',
               type: 'text',
               value: ''
            }
         }
      ]
   }
}

// для полноценной работы нужен функционал для добавления результатов фазы. А так же для просмотра.
// Добавлять к фазе файл или текст может только исполнитель фазы
// Нужно добоавить сокеты на изменение в текущем состоянии фазы. И высылать уведомления при переходе с фазы на фазу.
// Благодаря реализованным подзадачам можно расширять бесконечно
