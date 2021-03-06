/**
 * User: caolvchong@gmail.com
 * Date: 9/5/13
 * Time: 4:18 PM
 */
define(function(require, exports, module) {
    var UE = require('../editor');
    var domUtils = require('../core/domUtils');

    ///import core
    ///import plugins\paragraph.js
    ///commands 段间距
    ///commandsName  RowSpacingBottom,RowSpacingTop
    ///commandsTitle  段间距
    /**
     * @description 设置段前距,段后距
     * @name baidu.editor.execCommand
     * @param   {String}   cmdName     rowspacing设置段间距
     * @param   {String}   value              值，以px为单位
     * @param   {String}   dir          top或bottom段前后段后
     * @author zhanyi
     */
    UE.plugins['rowspacing'] = function(){
        var me = this;
        me.setOpt({
            'rowspacingtop':['5', '10', '15', '20', '25'],
            'rowspacingbottom':['5', '10', '15', '20', '25']

        });
        me.commands['rowspacing'] =  {
            execCommand : function( cmdName,value,dir ) {
                this.execCommand('paragraph','p',{style:'margin-'+dir+':'+value + 'px'});
                return true;
            },
            queryCommandValue : function(cmdName,dir) {
                var pN = domUtils.filterNodeList(this.selection.getStartElementPath(),function(node){return domUtils.isBlockElm(node) }),
                    value;
                //trace:1026
                if(pN){
                    value = domUtils.getComputedStyle(pN,'margin-'+dir).replace(/[^\d]/g,'');
                    return !value ? 0 : value;
                }
                return 0;

            }
        };
    };


    module.exports = UE.plugins['rowspacing'];
});