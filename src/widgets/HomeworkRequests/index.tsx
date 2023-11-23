import { HomeworkRequestCard, HomeworkRequestCardGroup } from '@entities/homework';
import { HomeworkRequestCardVariant } from '@entities/homework/ui/HomeworkRequestCard/interface';
import React from 'react';

export const HomeworkRequests = () => {
    return (
        <HomeworkRequestCardGroup>
            <HomeworkRequestCard
                username={'Денис Чагин'}
                content={'Молодец'}
            />
            
            <HomeworkRequestCard
                variant={HomeworkRequestCardVariant.secondary}
                username={'Тимур'}
                content={'https://github.com/matvey/isExplorerSingleton.git'}
            />
            
            <HomeworkRequestCard
                username={'Денис Чагин'}
                content={'Не используй regEx, используй в данном случае синглтон, думаю самый лучший вариант'}
            />
            
            <HomeworkRequestCard
                variant={HomeworkRequestCardVariant.secondary}
                username={'Тимур'}
                content={'https://github.com/matvey/isExplorerRegex.git'}
            />
            
            <HomeworkRequestCard
                username={'Денис Чагин'}
                content={'Молодец'}
            />
            
            <HomeworkRequestCard
                variant={HomeworkRequestCardVariant.secondary}
                username={'Тимур'}
                content={'https://github.com/matvey/isExplorerSingleton.git'}
            />
            
            <HomeworkRequestCard
                username={'Денис Чагин'}
                content={'Не используй regEx, используй в данном случае синглтон, думаю самый лучший вариант'}
            />
            
            <HomeworkRequestCard
                variant={HomeworkRequestCardVariant.secondary}
                username={'Тимур'}
                content={'https://github.com/matvey/isExplorerRegex.git'}
            />
            {/*<HomeworkRequestCard*/}
            {/*    username={'Денис Чагин'}*/}
            {/*    content={'Молодец'}*/}
            {/*/>*/}
            
            {/*<HomeworkRequestCard*/}
            {/*    variant={HomeworkRequestCardVariant.secondary}*/}
            {/*    username={'Тимур'}*/}
            {/*    content={'https://github.com/matvey/isExplorerSingleton.git'}*/}
            {/*/>*/}
            
            {/*<HomeworkRequestCard*/}
            {/*    username={'Денис Чагин'}*/}
            {/*    content={'Не используй regEx, используй в данном случае синглтон, думаю самый лучший вариант'}*/}
            {/*/>*/}
            
            {/*<HomeworkRequestCard*/}
            {/*    variant={HomeworkRequestCardVariant.secondary}*/}
            {/*    username={'Тимур'}*/}
            {/*    content={'https://github.com/matvey/isExplorerRegex.git'}*/}
            {/*/>*/}
        </HomeworkRequestCardGroup>
    );
};