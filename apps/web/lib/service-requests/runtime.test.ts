import { describe, expect, it } from 'vitest';

import {
  createServiceRequest,
  getServiceRequestById,
  listServiceRequestEvents,
  partnerRespondToRequest,
  serviceRequestStatusLabel,
} from '@/lib/service-requests';

describe('service request partner workflow', () => {
  it('accepts a valid request once and preserves the new state', () => {
    const request = createServiceRequest({
      businessCategory: 'Retail',
      partnerCategory: 'website_development',
      requestedService: 'Website Build',
      city: 'Chennai',
      state: 'Tamil Nadu',
      budgetMinInr: 10000,
      budgetMaxInr: 50000,
      timelineDays: 20,
      requiredDocuments: ['Brand brief'],
      source: 'dashboard',
    });

    const accepted = partnerRespondToRequest(request.id, 'accept');

    expect(accepted?.status).toBe('partner_accepted');
    expect(serviceRequestStatusLabel(accepted!.status)).toBe('Partner Accepted');
    expect(listServiceRequestEvents(request.id).some((event) => event.title === 'Partner accepted')).toBe(true);
  });

  it('does not create a second timeline event when the request is already accepted', () => {
    const request = createServiceRequest({
      businessCategory: 'Retail',
      partnerCategory: 'website_development',
      requestedService: 'Website Build',
      city: 'Chennai',
      state: 'Tamil Nadu',
      budgetMinInr: 10000,
      budgetMaxInr: 50000,
      timelineDays: 20,
      requiredDocuments: ['Brand brief'],
      source: 'dashboard',
    });

    partnerRespondToRequest(request.id, 'accept');
    const before = listServiceRequestEvents(request.id).filter(
      (event) => event.title === 'Partner accepted',
    ).length;

    const secondAttempt = partnerRespondToRequest(request.id, 'accept');
    const after = listServiceRequestEvents(request.id).filter(
      (event) => event.title === 'Partner accepted',
    ).length;

    expect(secondAttempt?.status).toBe('partner_accepted');
    expect(before).toBe(after);
    expect(after).toBe(1);
  });

  it('enforces valid state transitions only for partner actions', () => {
    const request = createServiceRequest({
      businessCategory: 'Retail',
      partnerCategory: 'website_development',
      requestedService: 'Website Build',
      city: 'Chennai',
      state: 'Tamil Nadu',
      budgetMinInr: 10000,
      budgetMaxInr: 50000,
      timelineDays: 20,
      requiredDocuments: ['Brand brief'],
      source: 'dashboard',
    });

    const accepted = partnerRespondToRequest(request.id, 'accept');
    const started = partnerRespondToRequest(request.id, 'start');

    expect(accepted?.status).toBe('partner_accepted');
    expect(started?.status).toBe('in_progress');
    expect(listServiceRequestEvents(request.id).some((event) => event.title === 'Work started')).toBe(true);
  });

  it('does not re-add the same accepted state when the action is repeated rapidly', () => {
    const request = createServiceRequest({
      businessCategory: 'Retail',
      partnerCategory: 'website_development',
      requestedService: 'Website Build',
      city: 'Chennai',
      state: 'Tamil Nadu',
      budgetMinInr: 10000,
      budgetMaxInr: 50000,
      timelineDays: 20,
      requiredDocuments: ['Brand brief'],
      source: 'dashboard',
    });

    const first = partnerRespondToRequest(request.id, 'accept');
    const second = partnerRespondToRequest(request.id, 'accept');
    const third = getServiceRequestById(request.id);

    expect(first?.status).toBe('partner_accepted');
    expect(second?.status).toBe('partner_accepted');
    expect(third?.status).toBe('partner_accepted');
    expect(
      listServiceRequestEvents(request.id).filter((event) => event.title === 'Partner accepted').length,
    ).toBe(1);
  });
});
