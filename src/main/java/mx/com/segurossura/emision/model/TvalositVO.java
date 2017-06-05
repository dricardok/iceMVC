package mx.com.segurossura.emision.model;

import java.lang.reflect.Method;

import org.apache.commons.lang3.StringUtils;

import com.biosnettcs.core.Utils;

public class TvalositVO {
    
    private String cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, status, cdtipsit;

    private String otvalor01, otvalor02, otvalor03, otvalor04, otvalor05, otvalor06, otvalor07, otvalor08, otvalor09,
            otvalor10, otvalor11, otvalor12, otvalor13, otvalor14, otvalor15, otvalor16, otvalor17, otvalor18,
            otvalor19, otvalor20, otvalor21, otvalor22, otvalor23, otvalor24, otvalor25, otvalor26, otvalor27,
            otvalor28, otvalor29, otvalor30, otvalor31, otvalor32, otvalor33, otvalor34, otvalor35, otvalor36,
            otvalor37, otvalor38, otvalor39, otvalor40, otvalor41, otvalor42, otvalor43, otvalor44, otvalor45,
            otvalor46, otvalor47, otvalor48, otvalor49, otvalor50, otvalor51, otvalor52, otvalor53, otvalor54,
            otvalor55, otvalor56, otvalor57, otvalor58, otvalor59, otvalor60, otvalor61, otvalor62, otvalor63,
            otvalor64, otvalor65, otvalor66, otvalor67, otvalor68, otvalor69, otvalor70, otvalor71, otvalor72,
            otvalor73, otvalor74, otvalor75, otvalor76, otvalor77, otvalor78, otvalor79, otvalor80, otvalor81,
            otvalor82, otvalor83, otvalor84, otvalor85, otvalor86, otvalor87, otvalor88, otvalor89, otvalor90,
            otvalor91, otvalor92, otvalor93, otvalor94, otvalor95, otvalor96, otvalor97, otvalor98, otvalor99,
            otvalor100, otvalor101, otvalor102, otvalor103, otvalor104, otvalor105, otvalor106, otvalor107, otvalor108,
            otvalor109, otvalor110, otvalor111, otvalor112, otvalor113, otvalor114, otvalor115, otvalor116, otvalor117,
            otvalor118, otvalor119, otvalor120;

    public TvalositVO(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String nmsuplem, String status, String cdtipsit){
        this.cdunieco = cdunieco;
        this.cdramo = cdramo;
        this.estado = estado;
        this.nmpoliza = nmpoliza;
        this.nmsituac = nmsituac;
        this.nmsuplem = nmsuplem;
        this.status = status;
        this.cdtipsit = cdtipsit;
    }
    
    public void put(String clave, String valor) throws Exception{
        Method method = this.getClass().getMethod(Utils.log("set", StringUtils.capitalize(clave)), String.class);
        method.invoke(this, valor);
    }

    public String getCdunieco() {
        return cdunieco;
    }

    public void setCdunieco(String cdunieco) {
        this.cdunieco = cdunieco;
    }

    public String getCdramo() {
        return cdramo;
    }

    public void setCdramo(String cdramo) {
        this.cdramo = cdramo;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getNmpoliza() {
        return nmpoliza;
    }

    public void setNmpoliza(String nmpoliza) {
        this.nmpoliza = nmpoliza;
    }

    public String getNmsituac() {
        return nmsituac;
    }

    public void setNmsituac(String nmsituac) {
        this.nmsituac = nmsituac;
    }

    public String getNmsuplem() {
        return nmsuplem;
    }

    public void setNmsuplem(String nmsuplem) {
        this.nmsuplem = nmsuplem;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCdtipsit() {
        return cdtipsit;
    }

    public void setCdtipsit(String cdtipsit) {
        this.cdtipsit = cdtipsit;
    }

    public String getOtvalor01() {
        return otvalor01;
    }

    public void setOtvalor01(String otvalor01) {
        this.otvalor01 = otvalor01;
    }

    public String getOtvalor02() {
        return otvalor02;
    }

    public void setOtvalor02(String otvalor02) {
        this.otvalor02 = otvalor02;
    }

    public String getOtvalor03() {
        return otvalor03;
    }

    public void setOtvalor03(String otvalor03) {
        this.otvalor03 = otvalor03;
    }

    public String getOtvalor04() {
        return otvalor04;
    }

    public void setOtvalor04(String otvalor04) {
        this.otvalor04 = otvalor04;
    }

    public String getOtvalor05() {
        return otvalor05;
    }

    public void setOtvalor05(String otvalor05) {
        this.otvalor05 = otvalor05;
    }

    public String getOtvalor06() {
        return otvalor06;
    }

    public void setOtvalor06(String otvalor06) {
        this.otvalor06 = otvalor06;
    }

    public String getOtvalor07() {
        return otvalor07;
    }

    public void setOtvalor07(String otvalor07) {
        this.otvalor07 = otvalor07;
    }

    public String getOtvalor08() {
        return otvalor08;
    }

    public void setOtvalor08(String otvalor08) {
        this.otvalor08 = otvalor08;
    }

    public String getOtvalor09() {
        return otvalor09;
    }

    public void setOtvalor09(String otvalor09) {
        this.otvalor09 = otvalor09;
    }

    public String getOtvalor10() {
        return otvalor10;
    }

    public void setOtvalor10(String otvalor10) {
        this.otvalor10 = otvalor10;
    }

    public String getOtvalor11() {
        return otvalor11;
    }

    public void setOtvalor11(String otvalor11) {
        this.otvalor11 = otvalor11;
    }

    public String getOtvalor12() {
        return otvalor12;
    }

    public void setOtvalor12(String otvalor12) {
        this.otvalor12 = otvalor12;
    }

    public String getOtvalor13() {
        return otvalor13;
    }

    public void setOtvalor13(String otvalor13) {
        this.otvalor13 = otvalor13;
    }

    public String getOtvalor14() {
        return otvalor14;
    }

    public void setOtvalor14(String otvalor14) {
        this.otvalor14 = otvalor14;
    }

    public String getOtvalor15() {
        return otvalor15;
    }

    public void setOtvalor15(String otvalor15) {
        this.otvalor15 = otvalor15;
    }

    public String getOtvalor16() {
        return otvalor16;
    }

    public void setOtvalor16(String otvalor16) {
        this.otvalor16 = otvalor16;
    }

    public String getOtvalor17() {
        return otvalor17;
    }

    public void setOtvalor17(String otvalor17) {
        this.otvalor17 = otvalor17;
    }

    public String getOtvalor18() {
        return otvalor18;
    }

    public void setOtvalor18(String otvalor18) {
        this.otvalor18 = otvalor18;
    }

    public String getOtvalor19() {
        return otvalor19;
    }

    public void setOtvalor19(String otvalor19) {
        this.otvalor19 = otvalor19;
    }

    public String getOtvalor20() {
        return otvalor20;
    }

    public void setOtvalor20(String otvalor20) {
        this.otvalor20 = otvalor20;
    }

    public String getOtvalor21() {
        return otvalor21;
    }

    public void setOtvalor21(String otvalor21) {
        this.otvalor21 = otvalor21;
    }

    public String getOtvalor22() {
        return otvalor22;
    }

    public void setOtvalor22(String otvalor22) {
        this.otvalor22 = otvalor22;
    }

    public String getOtvalor23() {
        return otvalor23;
    }

    public void setOtvalor23(String otvalor23) {
        this.otvalor23 = otvalor23;
    }

    public String getOtvalor24() {
        return otvalor24;
    }

    public void setOtvalor24(String otvalor24) {
        this.otvalor24 = otvalor24;
    }

    public String getOtvalor25() {
        return otvalor25;
    }

    public void setOtvalor25(String otvalor25) {
        this.otvalor25 = otvalor25;
    }

    public String getOtvalor26() {
        return otvalor26;
    }

    public void setOtvalor26(String otvalor26) {
        this.otvalor26 = otvalor26;
    }

    public String getOtvalor27() {
        return otvalor27;
    }

    public void setOtvalor27(String otvalor27) {
        this.otvalor27 = otvalor27;
    }

    public String getOtvalor28() {
        return otvalor28;
    }

    public void setOtvalor28(String otvalor28) {
        this.otvalor28 = otvalor28;
    }

    public String getOtvalor29() {
        return otvalor29;
    }

    public void setOtvalor29(String otvalor29) {
        this.otvalor29 = otvalor29;
    }

    public String getOtvalor30() {
        return otvalor30;
    }

    public void setOtvalor30(String otvalor30) {
        this.otvalor30 = otvalor30;
    }

    public String getOtvalor31() {
        return otvalor31;
    }

    public void setOtvalor31(String otvalor31) {
        this.otvalor31 = otvalor31;
    }

    public String getOtvalor32() {
        return otvalor32;
    }

    public void setOtvalor32(String otvalor32) {
        this.otvalor32 = otvalor32;
    }

    public String getOtvalor33() {
        return otvalor33;
    }

    public void setOtvalor33(String otvalor33) {
        this.otvalor33 = otvalor33;
    }

    public String getOtvalor34() {
        return otvalor34;
    }

    public void setOtvalor34(String otvalor34) {
        this.otvalor34 = otvalor34;
    }

    public String getOtvalor35() {
        return otvalor35;
    }

    public void setOtvalor35(String otvalor35) {
        this.otvalor35 = otvalor35;
    }

    public String getOtvalor36() {
        return otvalor36;
    }

    public void setOtvalor36(String otvalor36) {
        this.otvalor36 = otvalor36;
    }

    public String getOtvalor37() {
        return otvalor37;
    }

    public void setOtvalor37(String otvalor37) {
        this.otvalor37 = otvalor37;
    }

    public String getOtvalor38() {
        return otvalor38;
    }

    public void setOtvalor38(String otvalor38) {
        this.otvalor38 = otvalor38;
    }

    public String getOtvalor39() {
        return otvalor39;
    }

    public void setOtvalor39(String otvalor39) {
        this.otvalor39 = otvalor39;
    }

    public String getOtvalor40() {
        return otvalor40;
    }

    public void setOtvalor40(String otvalor40) {
        this.otvalor40 = otvalor40;
    }

    public String getOtvalor41() {
        return otvalor41;
    }

    public void setOtvalor41(String otvalor41) {
        this.otvalor41 = otvalor41;
    }

    public String getOtvalor42() {
        return otvalor42;
    }

    public void setOtvalor42(String otvalor42) {
        this.otvalor42 = otvalor42;
    }

    public String getOtvalor43() {
        return otvalor43;
    }

    public void setOtvalor43(String otvalor43) {
        this.otvalor43 = otvalor43;
    }

    public String getOtvalor44() {
        return otvalor44;
    }

    public void setOtvalor44(String otvalor44) {
        this.otvalor44 = otvalor44;
    }

    public String getOtvalor45() {
        return otvalor45;
    }

    public void setOtvalor45(String otvalor45) {
        this.otvalor45 = otvalor45;
    }

    public String getOtvalor46() {
        return otvalor46;
    }

    public void setOtvalor46(String otvalor46) {
        this.otvalor46 = otvalor46;
    }

    public String getOtvalor47() {
        return otvalor47;
    }

    public void setOtvalor47(String otvalor47) {
        this.otvalor47 = otvalor47;
    }

    public String getOtvalor48() {
        return otvalor48;
    }

    public void setOtvalor48(String otvalor48) {
        this.otvalor48 = otvalor48;
    }

    public String getOtvalor49() {
        return otvalor49;
    }

    public void setOtvalor49(String otvalor49) {
        this.otvalor49 = otvalor49;
    }

    public String getOtvalor50() {
        return otvalor50;
    }

    public void setOtvalor50(String otvalor50) {
        this.otvalor50 = otvalor50;
    }

    public String getOtvalor51() {
        return otvalor51;
    }

    public void setOtvalor51(String otvalor51) {
        this.otvalor51 = otvalor51;
    }

    public String getOtvalor52() {
        return otvalor52;
    }

    public void setOtvalor52(String otvalor52) {
        this.otvalor52 = otvalor52;
    }

    public String getOtvalor53() {
        return otvalor53;
    }

    public void setOtvalor53(String otvalor53) {
        this.otvalor53 = otvalor53;
    }

    public String getOtvalor54() {
        return otvalor54;
    }

    public void setOtvalor54(String otvalor54) {
        this.otvalor54 = otvalor54;
    }

    public String getOtvalor55() {
        return otvalor55;
    }

    public void setOtvalor55(String otvalor55) {
        this.otvalor55 = otvalor55;
    }

    public String getOtvalor56() {
        return otvalor56;
    }

    public void setOtvalor56(String otvalor56) {
        this.otvalor56 = otvalor56;
    }

    public String getOtvalor57() {
        return otvalor57;
    }

    public void setOtvalor57(String otvalor57) {
        this.otvalor57 = otvalor57;
    }

    public String getOtvalor58() {
        return otvalor58;
    }

    public void setOtvalor58(String otvalor58) {
        this.otvalor58 = otvalor58;
    }

    public String getOtvalor59() {
        return otvalor59;
    }

    public void setOtvalor59(String otvalor59) {
        this.otvalor59 = otvalor59;
    }

    public String getOtvalor60() {
        return otvalor60;
    }

    public void setOtvalor60(String otvalor60) {
        this.otvalor60 = otvalor60;
    }

    public String getOtvalor61() {
        return otvalor61;
    }

    public void setOtvalor61(String otvalor61) {
        this.otvalor61 = otvalor61;
    }

    public String getOtvalor62() {
        return otvalor62;
    }

    public void setOtvalor62(String otvalor62) {
        this.otvalor62 = otvalor62;
    }

    public String getOtvalor63() {
        return otvalor63;
    }

    public void setOtvalor63(String otvalor63) {
        this.otvalor63 = otvalor63;
    }

    public String getOtvalor64() {
        return otvalor64;
    }

    public void setOtvalor64(String otvalor64) {
        this.otvalor64 = otvalor64;
    }

    public String getOtvalor65() {
        return otvalor65;
    }

    public void setOtvalor65(String otvalor65) {
        this.otvalor65 = otvalor65;
    }

    public String getOtvalor66() {
        return otvalor66;
    }

    public void setOtvalor66(String otvalor66) {
        this.otvalor66 = otvalor66;
    }

    public String getOtvalor67() {
        return otvalor67;
    }

    public void setOtvalor67(String otvalor67) {
        this.otvalor67 = otvalor67;
    }

    public String getOtvalor68() {
        return otvalor68;
    }

    public void setOtvalor68(String otvalor68) {
        this.otvalor68 = otvalor68;
    }

    public String getOtvalor69() {
        return otvalor69;
    }

    public void setOtvalor69(String otvalor69) {
        this.otvalor69 = otvalor69;
    }

    public String getOtvalor70() {
        return otvalor70;
    }

    public void setOtvalor70(String otvalor70) {
        this.otvalor70 = otvalor70;
    }

    public String getOtvalor71() {
        return otvalor71;
    }

    public void setOtvalor71(String otvalor71) {
        this.otvalor71 = otvalor71;
    }

    public String getOtvalor72() {
        return otvalor72;
    }

    public void setOtvalor72(String otvalor72) {
        this.otvalor72 = otvalor72;
    }

    public String getOtvalor73() {
        return otvalor73;
    }

    public void setOtvalor73(String otvalor73) {
        this.otvalor73 = otvalor73;
    }

    public String getOtvalor74() {
        return otvalor74;
    }

    public void setOtvalor74(String otvalor74) {
        this.otvalor74 = otvalor74;
    }

    public String getOtvalor75() {
        return otvalor75;
    }

    public void setOtvalor75(String otvalor75) {
        this.otvalor75 = otvalor75;
    }

    public String getOtvalor76() {
        return otvalor76;
    }

    public void setOtvalor76(String otvalor76) {
        this.otvalor76 = otvalor76;
    }

    public String getOtvalor77() {
        return otvalor77;
    }

    public void setOtvalor77(String otvalor77) {
        this.otvalor77 = otvalor77;
    }

    public String getOtvalor78() {
        return otvalor78;
    }

    public void setOtvalor78(String otvalor78) {
        this.otvalor78 = otvalor78;
    }

    public String getOtvalor79() {
        return otvalor79;
    }

    public void setOtvalor79(String otvalor79) {
        this.otvalor79 = otvalor79;
    }

    public String getOtvalor80() {
        return otvalor80;
    }

    public void setOtvalor80(String otvalor80) {
        this.otvalor80 = otvalor80;
    }

    public String getOtvalor81() {
        return otvalor81;
    }

    public void setOtvalor81(String otvalor81) {
        this.otvalor81 = otvalor81;
    }

    public String getOtvalor82() {
        return otvalor82;
    }

    public void setOtvalor82(String otvalor82) {
        this.otvalor82 = otvalor82;
    }

    public String getOtvalor83() {
        return otvalor83;
    }

    public void setOtvalor83(String otvalor83) {
        this.otvalor83 = otvalor83;
    }

    public String getOtvalor84() {
        return otvalor84;
    }

    public void setOtvalor84(String otvalor84) {
        this.otvalor84 = otvalor84;
    }

    public String getOtvalor85() {
        return otvalor85;
    }

    public void setOtvalor85(String otvalor85) {
        this.otvalor85 = otvalor85;
    }

    public String getOtvalor86() {
        return otvalor86;
    }

    public void setOtvalor86(String otvalor86) {
        this.otvalor86 = otvalor86;
    }

    public String getOtvalor87() {
        return otvalor87;
    }

    public void setOtvalor87(String otvalor87) {
        this.otvalor87 = otvalor87;
    }

    public String getOtvalor88() {
        return otvalor88;
    }

    public void setOtvalor88(String otvalor88) {
        this.otvalor88 = otvalor88;
    }

    public String getOtvalor89() {
        return otvalor89;
    }

    public void setOtvalor89(String otvalor89) {
        this.otvalor89 = otvalor89;
    }

    public String getOtvalor90() {
        return otvalor90;
    }

    public void setOtvalor90(String otvalor90) {
        this.otvalor90 = otvalor90;
    }

    public String getOtvalor91() {
        return otvalor91;
    }

    public void setOtvalor91(String otvalor91) {
        this.otvalor91 = otvalor91;
    }

    public String getOtvalor92() {
        return otvalor92;
    }

    public void setOtvalor92(String otvalor92) {
        this.otvalor92 = otvalor92;
    }

    public String getOtvalor93() {
        return otvalor93;
    }

    public void setOtvalor93(String otvalor93) {
        this.otvalor93 = otvalor93;
    }

    public String getOtvalor94() {
        return otvalor94;
    }

    public void setOtvalor94(String otvalor94) {
        this.otvalor94 = otvalor94;
    }

    public String getOtvalor95() {
        return otvalor95;
    }

    public void setOtvalor95(String otvalor95) {
        this.otvalor95 = otvalor95;
    }

    public String getOtvalor96() {
        return otvalor96;
    }

    public void setOtvalor96(String otvalor96) {
        this.otvalor96 = otvalor96;
    }

    public String getOtvalor97() {
        return otvalor97;
    }

    public void setOtvalor97(String otvalor97) {
        this.otvalor97 = otvalor97;
    }

    public String getOtvalor98() {
        return otvalor98;
    }

    public void setOtvalor98(String otvalor98) {
        this.otvalor98 = otvalor98;
    }

    public String getOtvalor99() {
        return otvalor99;
    }

    public void setOtvalor99(String otvalor99) {
        this.otvalor99 = otvalor99;
    }

    public String getOtvalor100() {
        return otvalor100;
    }

    public void setOtvalor100(String otvalor100) {
        this.otvalor100 = otvalor100;
    }

    public String getOtvalor101() {
        return otvalor101;
    }

    public void setOtvalor101(String otvalor101) {
        this.otvalor101 = otvalor101;
    }

    public String getOtvalor102() {
        return otvalor102;
    }

    public void setOtvalor102(String otvalor102) {
        this.otvalor102 = otvalor102;
    }

    public String getOtvalor103() {
        return otvalor103;
    }

    public void setOtvalor103(String otvalor103) {
        this.otvalor103 = otvalor103;
    }

    public String getOtvalor104() {
        return otvalor104;
    }

    public void setOtvalor104(String otvalor104) {
        this.otvalor104 = otvalor104;
    }

    public String getOtvalor105() {
        return otvalor105;
    }

    public void setOtvalor105(String otvalor105) {
        this.otvalor105 = otvalor105;
    }

    public String getOtvalor106() {
        return otvalor106;
    }

    public void setOtvalor106(String otvalor106) {
        this.otvalor106 = otvalor106;
    }

    public String getOtvalor107() {
        return otvalor107;
    }

    public void setOtvalor107(String otvalor107) {
        this.otvalor107 = otvalor107;
    }

    public String getOtvalor108() {
        return otvalor108;
    }

    public void setOtvalor108(String otvalor108) {
        this.otvalor108 = otvalor108;
    }

    public String getOtvalor109() {
        return otvalor109;
    }

    public void setOtvalor109(String otvalor109) {
        this.otvalor109 = otvalor109;
    }

    public String getOtvalor110() {
        return otvalor110;
    }

    public void setOtvalor110(String otvalor110) {
        this.otvalor110 = otvalor110;
    }

    public String getOtvalor111() {
        return otvalor111;
    }

    public void setOtvalor111(String otvalor111) {
        this.otvalor111 = otvalor111;
    }

    public String getOtvalor112() {
        return otvalor112;
    }

    public void setOtvalor112(String otvalor112) {
        this.otvalor112 = otvalor112;
    }

    public String getOtvalor113() {
        return otvalor113;
    }

    public void setOtvalor113(String otvalor113) {
        this.otvalor113 = otvalor113;
    }

    public String getOtvalor114() {
        return otvalor114;
    }

    public void setOtvalor114(String otvalor114) {
        this.otvalor114 = otvalor114;
    }

    public String getOtvalor115() {
        return otvalor115;
    }

    public void setOtvalor115(String otvalor115) {
        this.otvalor115 = otvalor115;
    }

    public String getOtvalor116() {
        return otvalor116;
    }

    public void setOtvalor116(String otvalor116) {
        this.otvalor116 = otvalor116;
    }

    public String getOtvalor117() {
        return otvalor117;
    }

    public void setOtvalor117(String otvalor117) {
        this.otvalor117 = otvalor117;
    }

    public String getOtvalor118() {
        return otvalor118;
    }

    public void setOtvalor118(String otvalor118) {
        this.otvalor118 = otvalor118;
    }

    public String getOtvalor119() {
        return otvalor119;
    }

    public void setOtvalor119(String otvalor119) {
        this.otvalor119 = otvalor119;
    }

    public String getOtvalor120() {
        return otvalor120;
    }

    public void setOtvalor120(String otvalor120) {
        this.otvalor120 = otvalor120;
    }
}
