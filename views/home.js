"use strict";

TipCalculator.Home = function(params) {
    var DEFAULT_TIP_PERCENT = 15,
        ROUND_UP = 1,
        ROUND_DOWN = -1,
        ROUD_NONE = 0;

    var billTotal = ko.observable(),
        roundMode = ko.observable(ROUD_NONE),
        tipPercent = ko.observable(DEFAULT_TIP_PERCENT),
        splitNum = ko.observable(1);

    function billTotalAsNumber() {
        return billTotal() || 0;
    }

    billTotal.subscribe(function() {
        roundMode(ROUD_NONE);
    });

    tipPercent.subscribe(function() {
        roundMode(ROUD_NONE);
    });

    splitNum.subscribe(function() {
        roundMode(ROUD_NONE);
    });

    var totalTip = ko.computed(function() {
        return tipPercent() / 100 * billTotalAsNumber();
    });

    var totalToPay = ko.computed(function() {
        var sum = totalTip() + billTotalAsNumber();
        switch(roundMode()) {
            case ROUND_DOWN:
                if(Math.floor(sum) > billTotalAsNumber()) {
                    return Math.floor(sum);
                } else {
                    return sum;
                }
                break
            case ROUND_UP:
                return Math.ceil(sum);
            case ROUD_NONE:
                return sum;
        }        
    });

    var totalPerPerson = ko.computed(function() {
        return totalToPay() / splitNum();
    });

    var tipPerPerson = ko.computed(function() {
        return totalTip() / splitNum();
    });

    function roundUp() {
        roundMode(ROUND_UP);
    }
        
    function roundDown() {
        roundMode(ROUND_DOWN);
    }

    function viewShown() {
        $("#billTotalInput").data("dxNumberbox").focus();
    }

    return {
        viewShown: viewShown,
        billTotal: billTotal,
        totalTip: totalTip,
        totalToPay: totalToPay,
        totalPerPerson: totalPerPerson,
        tipPerPerson:tipPerPerson,
        tipPercent: tipPercent,
        splitNum: splitNum,
        roundUp: roundUp,
        roundDown: roundDown
    };
};