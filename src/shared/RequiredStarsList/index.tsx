import {
    useEffect,
    useState,
} from 'react';

import { fetchSystemById } from '@entities/orbit/api/fetchSystemById';

import { Button } from '@shared/Button';

import { ReactComponent as StarIcon } from '@shared/images/star.svg';

import { bem } from '@shared/utils/bem';

import {
    RequiredStarInterface,
    RequiredStarsListInterface,
} from './interfaces';
import {
    buttonColor,
    buttonSize,
} from '@shared/Button/interfaces';

import './styles.scss';

export const RequiredStarsList = (props: RequiredStarsListInterface) => {
    const {
        list = [],
    } = props;

    const [block, element] = bem('required-list');

    const [resultStarsList, setResultStarsList] = useState<Array<RequiredStarInterface>>([]);

    // useEffect(() => {
    //     let result: Array<RequiredStarInterface> = [];
    //     list.forEach((item) => {
    //         fetchSystemById({
    //             id: item.systemId,
    //         }).then((response) => {
    //             result.push({
    //                 id: item.systemId,
    //                 name: response.systemName,
    //             });
    //         });
    //     });
    //     setResultStarsList(result);
    // }, []);

    useEffect(() => {
        const test = Promise.all(
            list.map((item) => {
                fetchSystemById({
                    id: item.systemId,
                }).then((response) => {
                    return {
                        id: item.systemId,
                        name: response.systemName,
                    };
                });
            }),
        );

        console.log();

        test.then((response) => {
            console.log(response);
        });

        // setResultStarsList(
        //     list.map((item) => {
        //         fetchSystemById({
        //             id: item.systemId,
        //         }).then((response) => {
        //
        //         });
        //
        //         return {
        //             id: item.systemId,
        //             name: String(item.systemId),
        //         }; // todo https://stackoverflow.com/questions/66505445/how-to-make-api-calls-for-each-element-in-array
        //     }),
        // );
    }, []);

    return (
        <div className={block()}>
            {resultStarsList.map((star) => (
                <div
                    key={star.id}
                    className={element('item')}
                >
                    <div className={element('star')}>
                        <StarIcon className={element('star-icon')} />
                        <span className={element('name')}>
                            {star.name}
                        </span>
                    </div>
                    <div className={element('info')}>
                        <div className={element('button')}>
                            <Button
                                size={buttonSize.small}
                                color={buttonColor.filled}
                                title="Перейти"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
