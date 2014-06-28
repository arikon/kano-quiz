({
    block: 'page',
    title: 'Title of the page',
    favicon: '/favicon.ico',
    head: [
        { elem: 'meta', attrs: { name: 'description', content: '' } },
        { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
        { elem: 'css', url: 'index.min.css' }
    ],
    scripts: [{ elem: 'js', url: 'index.min.js' }],
    mods: { theme: 'normal' },
    content: [
        {
            block : 'header',
            content : [
                {
                    tag : 'h1',
                    content : 'Каноквиз'
                }
            ]
        },
        {
            block : 'survey',
            content : [
                {
                    elem : 'title',
                    content : 'survey.title'
                },
                {
                    elem : 'description',
                    content : 'survey.description'
                },
                {
                    elem : 'question-index',
                    content : 'Вопрос №1 из 5'
                },
                {
                    elem : 'question',
                    content : 'question.text'
                },
                {
                    block : 'answer',
                    content : [
                        {
                            elem : 'left',
                            content : [
                                {
                                    elem : 'caption',
                                    content : 'Как вы относитесь к НАЛИЧИЮ данной функции?'
                                },
                                {
                                    block : 'radio-group',
                                    name : 'ilikeit',
                                    mods : { theme : 'normal', size : 'm' },
                                    options : [
                                        { val : 5, text : 'Мне это нравится' },
                                        { val : 4, text : 'Я ожидаю это именно в таком виде' },
                                        { val : 3, text : 'Мне все равно' },
                                        { val : 2, text : 'Я могу жить с этим' },
                                        { val : 1, text : 'Мне это не нравится' }
                                    ]
                                }
                            ]
                        },
                        {
                            elem : 'right',
                            content : [
                                {
                                    elem : 'caption',
                                    content : 'Как вы относитесь к ОТСУТСТВИЮ данной функции?'
                                },
                                {
                                    block : 'radio-group',
                                    name : 'idontlikeit',
                                    mods : { theme : 'normal', size : 'm' },
                                    options : [
                                        { val : 5, text : 'Мне это нравится' },
                                        { val : 4, text : 'Я ожидаю это именно в таком виде' },
                                        { val : 3, text : 'Мне все равно' },
                                        { val : 2, text : 'Я могу жить с этим' },
                                        { val : 1, text : 'Мне это не нравится' }
                                    ]
                                }
                            ]
                        },
                        {
                            block : 'button',
                            type : 'submit',
                            mods : { theme : 'normal', size : 'm' },
                            mix : { block: 'survey', elem : 'next' },
                            text : 'Следующий вопрос'
                        }
                    ]
                }
            ]
        }
    ]
})
