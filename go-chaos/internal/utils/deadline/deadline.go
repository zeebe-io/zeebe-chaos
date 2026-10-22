package deadline

import "time"

type Deadline struct {
	deadline time.Time
	interval time.Duration
}

func NewDeadliner(timeout time.Duration, interval time.Duration) *Deadline {
	deadline := time.Now().Add(timeout)
	return &Deadline{
		deadline: deadline,
		interval: interval,
	}
}

func (d *Deadline) Iterate() func(yield func(i int) bool) {
	return func(yield func(i int) bool) {
		for i := 0; ; i++ {
			if !yield(i) {
				return
			}

			// Always execute the loop once
			if !time.Now().Add(d.interval).Before(d.deadline) {
				return
			}
		}
	}
}

func (d *Deadline) IterateWithSleep() func(yield func(i int) bool) {
	return func(yield func(i int) bool) {
		for i := range d.Iterate() {
			if i > 0 {
				d.Sleep()
			}
			if !yield(i) {
				return
			}
		}
	}
}

func (d *Deadline) Sleep() {
	time.Sleep(d.interval)
}

func (d *Deadline) Remaining() time.Duration {
	return time.Until(d.deadline)
}
