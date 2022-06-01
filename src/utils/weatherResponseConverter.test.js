import { expect } from 'chai';
import { simplifyAlerts, tempToString } from './weatherResponseConverter';

describe('requestUtil', () => {
  describe('tempToString', () => {
    it('handles boundaries', () => {
      expect(tempToString(85))
        .to
        .equal('hot');
      expect(tempToString(84.99999))
        .to
        .equal('moderate');
      expect(tempToString(50.00001))
        .to
        .equal('moderate');
      expect(tempToString(49.99999))
        .to
        .equal('cold');
    });

    it('handles bad data', () => {
      expect(tempToString({}))
        .to
        .equal('unknown');
      expect(tempToString(undefined))
        .to
        .equal('unknown');
      expect(tempToString(null))
        .to
        .equal('unknown');
      expect(tempToString(''))
        .to
        .equal('unknown');
    });
  });

  describe('simplifyAlerts', () => {
    it('handles empty alerts', () => {
      expect(simplifyAlerts([]))
        .to
        .eql([]);
      expect(simplifyAlerts(undefined))
        .to
        .equal(undefined);
      expect(simplifyAlerts(null))
        .to
        .equal(undefined);
    });

    it('handles alerts array', () => {
      expect(simplifyAlerts([
        {
          sender_name: 'testSender1',
          event: 'Flood Watch',
          start: 1653925800,
          end: 1654452000,
          description: '...FLOOD WATCH NOW IN EFFECT...',
          tags: ['Flood'],
        },
        {
          sender_name: 'testSender2',
          event: 'Severe Weather Statement',
          start: 1653922620,
          end: 1654030800,
          description: '...SEVERE THUNDERSTORM WARNING FOR...',
          tags: [],
        },
        {
          sender_name: 'testSender3',
          event: 'Severe Weather Statement',
          start: 1654030800,
          end: 1654348380,
          description: '...THE SEVERE THUNDERSTORM WARNING FOR...',
          tags: [],
        },
      ]))
        .to
        .eql([
          'Flood Watch: ...FLOOD WATCH NOW IN EFFECT...',
          'Severe Weather Statement: ...SEVERE THUNDERSTORM WARNING FOR...',
          'Severe Weather Statement: ...THE SEVERE THUNDERSTORM WARNING FOR...',
        ]);
    });
  });
});
