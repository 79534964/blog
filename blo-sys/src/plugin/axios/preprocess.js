import {dateFormat} from '@/common/js/utils';
import * as R from 'ramda';

export default {
    init(list) {
        let body = {};
        console.log(list);
        R.forEach(
            R.mapObjIndexed((value, key) => {
                body = R.assoc(key, value)(body);
            })
        )(R.map(e => preprocess[e.type](e))(list));
        return body;
    }
};

const preprocess = {
    String({data}) {
        let body = {};
        R.forEach(
            R.mapObjIndexed((value, key) => {
                body = R.assoc(key, R.anyPass([
                        R.equals(''),
                        R.equals(null),
                        R.equals(undefined)
                    ])(value)
                    ? ''
                    : R.is(String)(value)
                        ? value
                        : R.toString(value)
                )(body);
            })
        )(data);
        return body;
    },
    Number({data}) {
        let body = {};
        R.forEach(
            R.mapObjIndexed((value, key) => {
                body = R.assoc(key, R.anyPass([
                        R.equals(''),
                        R.equals(null),
                        R.equals(undefined)
                    ])(value)
                    ? ''
                    : R.is(Number)(value)
                        ? value
                        : Number(value)
                )(body);
            })
        )(data);
        return body;
    },
    Array({data}) {
        let body = {};
        R.forEach(
            R.mapObjIndexed((value, key) => {
                body = R.assoc(key, R.anyPass([
                        R.equals(''),
                        R.equals(null),
                        R.equals(undefined),
                        R.equals([])
                    ])(value)
                    ? '[]'
                    : JSON.stringify(value)
                )(body);
            })
        )(data);
        return body;
    },
    FileToString({data}) {
        let body = {};
        R.forEach(
            R.mapObjIndexed((value, key) => {
                body = R.assoc(key, R.anyPass([
                        R.equals(''),
                        R.equals(null),
                        R.equals(undefined)
                    ])(value)
                    ? ''
                    : `${value}.md`
                )(body);
            })
        )(data);
        return body;
    },
    ArrayToString({data}) {
        let body = {};
        R.forEach(
            R.mapObjIndexed((value, key) => {
                body = R.assoc(key, R.anyPass([
                        R.equals(''),
                        R.equals(null),
                        R.equals(undefined),
                        R.equals([])
                    ])(value)
                    ? ''
                    : R.join(',')(value)
                )(body);
            })
        )(data);
        return body;
    },
    ImgToImgUrl({data}) {
        let body = {};
        R.forEach(
            R.mapObjIndexed((value, key) => {
                body = R.assoc(key, R.anyPass([
                    R.equals(''),
                    R.equals(undefined),
                    R.equals([]),
                    R.equals(null)])(value)
                    ? ''
                    : R.join(',')(R.map(e => `$$group${R.split('/group')(e)[1]}`)(value))
                )(body);
            })
        )(data);
        return body;
    },
    Date({data, format}) {
        let body = {};
        R.forEach(
            R.mapObjIndexed((value, key) => {
                    body = R.assoc(key, R.anyPass([
                            R.equals(''),
                            R.equals(null),
                            R.equals(undefined)
                        ])(value)
                        ? ''
                        : `${dateFormat(value, format)}`
                    )(body);
                }
            )
        )(data);
        return body;
    },
    DateToTimeStamp({data}) {
        let body = {};
        R.forEach(
            R.mapObjIndexed((value, key) => {
                    body = R.assoc(key, R.anyPass([
                            R.equals(''),
                            R.equals(undefined),
                            R.equals([]),
                            R.equals(null)
                        ])(value)
                        ? ''
                        : R.is(Array)(value)
                            ? R.join(',')(R.map(e => e ? parseInt(new Date(e).getTime() / 1000) : '')(value))
                            : parseInt(new Date(value).getTime() / 1000)
                    )(body);
                }
            )
        )(data);
        return body;
    },
    DateToFormat({data, category}) {
        let body = {};
        R.forEach(
            R.mapObjIndexed((value, key) => {
                    body = R.assoc(key, R.anyPass([
                            R.equals(''),
                            R.equals([]),
                            R.equals(undefined),
                            R.equals(null)
                        ])(value)
                        ? ''
                        : R.equals('start')(category)
                            ? value[0]
                                ? `${dateFormat(value[0], 'yyyy-MM-dd')} 00:00:00`
                                : ''
                            : value[1]
                                ? `${dateFormat(value[1], 'yyyy-MM-dd')} 23:59:59`
                                : ''
                    )(body);
                }
            )
        )(data);
        return body;
    }
};
