(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('apollo-utilities')) :
	typeof define === 'function' && define.amd ? define(['exports', 'apollo-utilities'], factory) :
	(factory((global.graphqlAnywhereAsync = {}),global.apollo.utilities));
}(this, (function (exports,apolloUtilities) { 'use strict';

function merge(dest, src) {
    if (src === null || typeof src !== 'object') {
        return src;
    }
    Object.keys(dest).forEach(function (destKey) {
        if (src.hasOwnProperty(destKey)) {
            merge(dest[destKey], src[destKey]);
        }
    });
    Object.keys(src).forEach(function (srcKey) {
        if (!dest.hasOwnProperty(srcKey)) {
            dest[srcKey] = src[srcKey];
        }
    });
}

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function graphql$1(resolver, document, rootValue, contextValue, variableValues, execOptions) {
    if (execOptions === void 0) { execOptions = {}; }
    var mainDefinition = apolloUtilities.getMainDefinition(document);
    var fragments = apolloUtilities.getFragmentDefinitions(document);
    var fragmentMap = apolloUtilities.createFragmentMap(fragments);
    var resultMapper = execOptions.resultMapper;
    var fragmentMatcher = execOptions.fragmentMatcher || (function () { return true; });
    var execContext = {
        fragmentMap: fragmentMap,
        contextValue: contextValue,
        variableValues: variableValues,
        resultMapper: resultMapper,
        resolver: resolver,
        fragmentMatcher: fragmentMatcher,
    };
    return executeSelectionSet$1(mainDefinition.selectionSet, rootValue, execContext);
}
function executeSelectionSet$1(selectionSet, rootValue, execContext) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var fragmentMap, contextValue, variables, result, execute;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fragmentMap = execContext.fragmentMap, contextValue = execContext.contextValue, variables = execContext.variableValues;
                    result = {};
                    execute = function (selection) { return __awaiter(_this, void 0, void 0, function () {
                        var fieldResult, resultFieldKey, fragment, typeCondition, fragmentResult;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!apolloUtilities.shouldInclude(selection, variables)) {
                                        return [2];
                                    }
                                    if (!apolloUtilities.isField(selection)) return [3, 2];
                                    return [4, executeField$1(selection, rootValue, execContext)];
                                case 1:
                                    fieldResult = _a.sent();
                                    resultFieldKey = apolloUtilities.resultKeyNameFromField(selection);
                                    if (fieldResult !== undefined) {
                                        if (result[resultFieldKey] === undefined) {
                                            result[resultFieldKey] = fieldResult;
                                        }
                                        else {
                                            merge(result[resultFieldKey], fieldResult);
                                        }
                                    }
                                    return [2];
                                case 2:
                                    if (apolloUtilities.isInlineFragment(selection)) {
                                        fragment = selection;
                                    }
                                    else {
                                        fragment = fragmentMap[selection.name.value];
                                        if (!fragment) {
                                            throw new Error("No fragment named " + selection.name.value);
                                        }
                                    }
                                    typeCondition = fragment.typeCondition.name.value;
                                    if (!execContext.fragmentMatcher(rootValue, typeCondition, contextValue)) return [3, 4];
                                    return [4, executeSelectionSet$1(fragment.selectionSet, rootValue, execContext)];
                                case 3:
                                    fragmentResult = _a.sent();
                                    merge(result, fragmentResult);
                                    _a.label = 4;
                                case 4: return [2];
                            }
                        });
                    }); };
                    return [4, Promise.all(selectionSet.selections.map(execute))];
                case 1:
                    _a.sent();
                    if (execContext.resultMapper) {
                        return [2, execContext.resultMapper(result, rootValue)];
                    }
                    return [2, result];
            }
        });
    });
}
function executeField$1(field, rootValue, execContext) {
    return __awaiter(this, void 0, void 0, function () {
        var variables, contextValue, resolver, fieldName, args, info, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    variables = execContext.variableValues, contextValue = execContext.contextValue, resolver = execContext.resolver;
                    fieldName = field.name.value;
                    args = apolloUtilities.argumentsObjectFromField(field, variables);
                    info = {
                        isLeaf: !field.selectionSet,
                        resultKey: apolloUtilities.resultKeyNameFromField(field),
                        directives: apolloUtilities.getDirectiveInfoFromField(field, variables),
                    };
                    return [4, resolver(fieldName, rootValue, args, contextValue, info)];
                case 1:
                    result = _a.sent();
                    if (!field.selectionSet) {
                        return [2, result];
                    }
                    if (result == null) {
                        return [2, result];
                    }
                    if (Array.isArray(result)) {
                        return [2, executeSubSelectedArray$1(field, result, execContext)];
                    }
                    return [2, executeSelectionSet$1(field.selectionSet, result, execContext)];
            }
        });
    });
}
function executeSubSelectedArray$1(field, result, execContext) {
    return Promise.all(result.map(function (item) {
        if (item === null) {
            return null;
        }
        if (Array.isArray(item)) {
            return executeSubSelectedArray$1(field, item, execContext);
        }
        return executeSelectionSet$1(field.selectionSet, item, execContext);
    }));
}

exports.graphql = graphql$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=async.js.map
