export class EnvironmentServiceMock {
  public static instance(): any {
    return {
      environment: {
        env: 'int',
        gapiUrl: 'http://gapi6.int.groupe.generali.fr',
        ssoicBaseUrl: 'https://www.ssoic.integ.generali.fr',
        ssoicIssuer: 'https://www.ssoic.int.groupe.generali.fr/SSOIC_OIDC_IDP',
        ssoicClientId: '0URIHPC0IOR2474N',
        generaliCustomerAreaWebSite: 'https://test1.generali-fr.integ.generali.fr/espace-client'
      },
      loadEnvironmentFromAssets: jest.fn().mockResolvedValue(undefined)
    };
  }
}
